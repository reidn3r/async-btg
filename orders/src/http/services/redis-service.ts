import { redis } from '../../../db/redis';

export class RedisService {
    /* 
        Redis:
            1. Armazenar produtos mais vendidos por quantidade (updateBestSellerProducts)
            2. Armazenar produtos mais vendidos por valor
            3. Armazenar clientes que mais gastaram
            4. Armazenar top 5 pedidos mais caros
            5. Armazenar 5 pedidos mais recentes *
    */

    async updateMostRecent(payload:string){
        const message = JSON.parse(payload);
        const llen:number = await redis.LLEN("list::most_recent_orders");
        
        if(llen > 5) await redis.RPOP("list::most_recent_orders");
        return await redis.LPUSH("list::most_recent_orders", message.orderId);
    }

    async updateBestSellerProducts(payload:string){
        const message = JSON.parse(payload);
        const setSize:number = await redis.zCard("set::best_seller_products_value");
    }
}