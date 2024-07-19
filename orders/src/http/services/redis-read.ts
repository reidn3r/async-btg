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

    async getMostProfitableProduct(){
        const set:string = "products::best_seller_products_amount";
        const member = await redis.zRangeWithScores(set, 0, 0, {
            REV:true
        })
        return member[0] ? member[0].value : null;
    }
    
    async getMostProfitableCustomer(){
        const set:string = "customers::best_customers";
        const member = await redis.zRangeWithScores(set, 0, 0, {
            REV:true
        })
        return member[0] ? member[0].value : null;
    }

    async getBestSellerProduct(){
        const set = "products::best_seller_products_value";
        const member = await redis.zRangeWithScores(set, 0, 0, {
            REV:true
        })
        return member[0] ? member[0].value : null;
    }
    
    async getBestSellerCustomer(){
        const set = "customers::orders_amount";
        const member = await redis.zRangeWithScores(set, 0, 0, {
            REV:true
        })
        return member[0] ? member[0].value : null;
    }
    
    async getMostExpensiveOrder(){
        const set = "orders::most_expensive_orders";
        const member = await redis.zRangeWithScores(set, 0, 0, {
            REV:true
        })
        return member[0] ? member[0].value : null;
    }

    
}