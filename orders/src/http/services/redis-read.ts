import { redis } from '../../../db/redis';

export class RedisRead {

    async getOrdersAmount(customerId:string):Promise<number | null>{
        const members = await redis.zRangeWithScores("customers::orders_amount", 0, -1);
        for(const m of members){
            if(m.value === customerId){
                return m.score;
            }
        }
        return null;
    }


    async getOrderValue(orderId:string):Promise<string | null>{
        const key:string = `order::total-value::${orderId}`;
        const value = await redis.get(key);
        if(!value) return null;
        return value;
    }
    
}