import { redis } from '../../../db/redis';
import { MessagePayload } from '../../../../customers/src/http/adapter/types/message-type';

export class RedisService {
    private mro_list:string = process.env.MOST_RECENT_ORDERS_LIST as string;
    private bspv_set:string = process.env.BEST_SELLER_PRODUCT_VALUE as string;
    private bspq_set:string = process.env.BEST_SELLER_PRODUCT_QUANTITY as string;
    private customer_value_set:string = process.env.CUSTOMER_VALUE_SET as string;
    private orders_values_set:string = process.env.ORDERS_VALUE_SET as string;


    async execute(payload:MessagePayload):Promise<void>{
        try{
            await Promise.all([
                this.updateMostRecent(payload),
                this.updateBestSellerProductsByValue(payload),
                this.updateBestSellerProductsByQuantity(payload),
                this.updateBestCustomers(payload),
                this.updateBestCustomers(payload),
                this.updateMostExpensiveOrders(payload)
            ])
        }
        catch(err){
            throw new Error("Error while updating cache data");
        }
    }

    async updateMostRecent(payload:MessagePayload):Promise<void>{
        const llen:number = await redis.LLEN(this.mro_list);
        if(llen > 20) await redis.RPOP(this.mro_list);
        await redis.LPUSH(this.mro_list, payload.orderId);
    }

    async updateBestSellerProductsByQuantity(payload:MessagePayload):Promise<void>{
        const items = payload.items.map((i) => { return { id: i.id, quantity: i.quantity }});
        for(const item of items){
            await redis.zIncrBy(this.bspq_set, item.quantity, item.id);
        };
    }

    async updateBestSellerProductsByValue(payload:MessagePayload):Promise<void>{
        const items = payload.items.map((i) => { return { id: i.id, quantity: i.quantity, value: i.value }});
        for(const item of items){
            await redis.zIncrBy(this.bspv_set, item.quantity * item.value, item.id);
        };
    }
    
    async updateBestCustomers(payload:MessagePayload):Promise<void>{
        const value = this.calculateOrderValue(payload);
        await redis.zIncrBy(this.customer_value_set, value, payload.customerId);
    }
    
    async updateMostExpensiveOrders(payload:MessagePayload):Promise<void>{
        const value = this.calculateOrderValue(payload);
        await redis.zAdd(this.orders_values_set, { score: value, value: payload.customerId});
    }
    
    
    private calculateOrderValue(payload:MessagePayload):number{
        return payload.items.reduce((acc, item) => acc + item.quantity * item.value, 0);
    }
}