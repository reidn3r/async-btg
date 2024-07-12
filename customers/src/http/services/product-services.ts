import { prisma } from "../../../db/prisma";
import { ProductRepository } from "../repository/product-repository";
import { ProductsRequestType } from '../adapter/types/products-request-type';

export class ProductServices extends ProductRepository{

    async findProductByName(name:string){
        return this.findByName(name);
    }

    async validateProducts(product_array:ProductsRequestType[]){
        const names:string[] = product_array.map((p) => { return p.name })
        const foundProducts = await prisma.product.findMany({
            select: {
                value:true,
                name:true,
                id:true
            },
            where: {
                name: { in: names }
            }
        })

        return foundProducts.length === names.length ? foundProducts.map((p, idx) => {
            return {
                ...p,
                quantity: product_array[idx].quantity
            }
        }) : null;
    }

}