import { redis } from '../../../db/redis';
import { MessagePayload } from '../../../../customers/src/http/adapter/types/message-type';

export class RedisStoreData {
    
    async execute(payload:MessagePayload):Promise<void>{
        try{
            await Promise.all([
                this.updateMostRecent(payload),
                this.updateBestSellerProductsByValue(payload),
                this.updateBestSellerProductsByQuantity(payload),
                this.updateBestCustomersByValue(payload),
                this.updateBestCustomersByValue(payload),
                this.updateMostExpensiveOrders(payload),
                this.storeOrderTotalValue(payload),
                this.updateBestCustomersById(payload),
            ])
        }
        catch(err){
            throw new Error("Error while updating cache data");
        }
    }

    async storeOrderTotalValue(payload:MessagePayload){
        const orderId:string = payload.orderId;
        const orderValue:number = this.calculateOrderValue(payload);
        await redis.set(`order::total-value::${orderId}`, orderValue);
    }

    async updateMostRecent(payload:MessagePayload):Promise<void>{
        const llen:number = await redis.LLEN("orders::most_recent_orders");
        if(llen > 100) await redis.RPOP("orders::most_recent_orders");
        await redis.LPUSH("orders::most_recent_orders", JSON.stringify(payload));
    }

    async updateBestSellerProductsByQuantity(payload:MessagePayload):Promise<void>{
        const items = payload.items.map((i) => { return { id: i.id, quantity: i.quantity }});
        for(const item of items){
            await redis.zIncrBy("products::best_seller_products_value", item.quantity, item.id);
        };
    }

    async updateBestSellerProductsByValue(payload:MessagePayload):Promise<void>{
        const items = payload.items.map((i) => { return { id: i.id, quantity: i.quantity, value: i.value }});
        for(const item of items){
            await redis.zIncrBy("products::best_seller_products_amount", item.quantity * item.value, item.id);
        };
    }

    async updateBestCustomersById(payload:MessagePayload){
        const customerId:string = payload.customerId;
        await redis.zIncrBy("customers::orders_amount", 1, customerId);
    }
    
    async updateBestCustomersByValue(payload:MessagePayload):Promise<void>{
        const value = this.calculateOrderValue(payload);
        await redis.zIncrBy("customers::best_customers", value, payload.customerId);
    }
    
    async updateMostExpensiveOrders(payload:MessagePayload):Promise<void>{
        const value = this.calculateOrderValue(payload);
        await redis.zAdd("customers::best_customers", { score: value, value: payload.customerId});
    }
    
    
    private calculateOrderValue(payload:MessagePayload):number{
        return payload.items.reduce((acc, item) => acc + item.quantity * item.value, 0);
    }
}