import { prisma } from '../../../db/prisma';
import { ProductsValidatedType } from '../adapter/types/products-validated-type';

export class OrderRepository {

    async create(customerId:string, finalValue:number, products:ProductsValidatedType[]){
        return await prisma.order.create({
            data: {
                value: finalValue,
                customerId: customerId,
                Order_Product:{
                    createMany: {
                        data: products.map((p) => {
                            return {
                                productId: p.id,
                                quantity: p.quantity,
                                unitary_value: p.value,
                            }
                        })
                    }
                }
            }
        })
    }

}