import { prisma } from '../../../db/prisma'
import { RedisRead } from './redis-read';

export class Report extends RedisRead{

    async execute(month:number, year:number){
        const [
            most_profitable_product, most_profitable_customer,
            best_seller_product, best_seller_customer,
            most_expensive_order
        ] = await Promise.all([
            this.getMostProfitableProduct(),
            this.getMostProfitableCustomer(),
            this.getBestSellerProduct(),
            this.getBestSellerCustomer(),
            this.getMostExpensiveOrder()
        ])
        return await prisma.order_Report.create({
            data:{
                month,
                year,
                report:{
                    create:{
                        best_seller_customer,
                        best_seller_product,
                        most_expensive_order,
                        most_profitable_customer,
                        most_profitable_product,
                    }
                }
            }
        })
    }


}