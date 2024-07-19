import { redis } from '../../../db/redis';
import { MessagePayload } from '../../../../customers/src/http/adapter/types/message-type';

export class RedisStore {
    private expireTimeSeconds:number = 60*60*24*30; // 30 dias em segundos

    async execute(payload:MessagePayload):Promise<void>{
        try{
            await Promise.all([
                this.updateMostRecent(payload),
                this.updateBestSellerProductsByValue(payload),
                this.updateBestSellerProductsByQuantity(payload),
                this.updateBestCustomersByValue(payload),
                this.updateBestCustomersById(payload),
                this.updateMostExpensiveOrders(payload),
                this.storeOrderTotalValue(payload)
            ]);
            await this.cleanUpExpiredMembers();
        }
        catch(err){
            throw new Error("Error while updating cache data");
        }
    }

    async storeOrderTotalValue(payload:MessagePayload){
        const orderId:string = payload.orderId;
        const orderValue:number = this.calculateOrderValue(payload);
        await redis.set(`order::total-value::${orderId}`, orderValue, {
            EX: this.expireTimeSeconds
        });
    }

    async updateMostRecent(payload:MessagePayload):Promise<void>{
        const llen:number = await redis.lLen("orders::most_recent_orders");
        if(llen > 100) await redis.rPop("orders::most_recent_orders");
        await redis.lPush("orders::most_recent_orders", JSON.stringify(payload));
    }

    async updateBestSellerProductsByQuantity(payload:MessagePayload):Promise<void>{
        const items = payload.items.map((i) => { return { id: i.id, quantity: i.quantity }});
        for(const item of items){
            await this.addItemWithTTL("products::best_seller_products_value", item.id, item.quantity, this.expireTimeSeconds);
        }
    }

    async updateBestSellerProductsByValue(payload:MessagePayload):Promise<void>{
        const items = payload.items.map((i) => { return { id: i.id, quantity: i.quantity, value: i.value }});
        for(const item of items){
            await this.addItemWithTTL("products::best_seller_products_amount", item.id, item.quantity * item.value, this.expireTimeSeconds);
        }
    }

    async updateBestCustomersById(payload:MessagePayload){
        const customerId:string = payload.customerId;
        await this.addItemWithTTL("customers::orders_amount", customerId, 1, this.expireTimeSeconds);
    }

    async updateBestCustomersByValue(payload:MessagePayload):Promise<void>{
        const value = this.calculateOrderValue(payload);
        await this.addItemWithTTL("customers::best_customers", payload.customerId, value, this.expireTimeSeconds);
    }

    async updateMostExpensiveOrders(payload:MessagePayload):Promise<void>{
        const value = this.calculateOrderValue(payload);
        await this.addItemWithTTL("orders::most_expensive_orders", payload.customerId, value, this.expireTimeSeconds);
    }

    private calculateOrderValue(payload:MessagePayload):number{
        return payload.items.reduce((acc, item) => acc + item.quantity * item.value, 0);
    }

    async addItemWithTTL(key, member, score, ttlSeconds) {
        const expireAt = Date.now() + ttlSeconds * 1000;
        const pipeline = redis.multi();

        pipeline.zAdd(key, { score, value: member });
        pipeline.hSet(`${key}::ttl`, member, expireAt);
        await pipeline.exec();
    }

    async removeExpiredMembers(key) {
        const now = Date.now();
        const expiredMembers:string[] = [];

        const membersTTL = await redis.hGetAll(`${key}::ttl`);
        for (const member in membersTTL) {
            if (parseInt(membersTTL[member]) < now) {
                expiredMembers.push(member);
            }
        }

        if (expiredMembers.length > 0) {
            const pipeline = redis.multi();
            for (const member of expiredMembers) {
                pipeline.zRem(key, member);
                pipeline.hDel(`${key}::ttl`, member);
            }
            await pipeline.exec();
        }
    }

    async cleanUpExpiredMembers() {
        await Promise.all([
            this.removeExpiredMembers("products::best_seller_products_value"),
            this.removeExpiredMembers("products::best_seller_products_amount"),
            this.removeExpiredMembers("customers::orders_amount"),
            this.removeExpiredMembers("customers::best_customers"),
            this.removeExpiredMembers("orders::most_expensive_orders")
        ]);
    }

    async clean(time:number){
        setInterval(async () => {
            await this.cleanUpExpiredMembers();
        }, time); // Verificar a cada "time" ms   
    }
}