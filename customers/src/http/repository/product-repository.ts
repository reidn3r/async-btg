import { prisma } from '../../../db/prisma';

export class ProductRepository{

    async findByName(name:string){
        return await prisma.product.findUnique({
            where:{
                name
            }
        });
    }

    async create(name:string, value:number){
        return await prisma.product.create({
            data:{
                name,
                value
            }
        })
    }
}