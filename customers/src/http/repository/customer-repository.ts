import { prisma } from '../../../db/prisma';

export class CustomerRepository{

    async create(username:string, email:string){
        return await prisma.customer.create({
            data:{
                username,
                email
            }
        });
    }

    async findByEmail(email:string){
        return await prisma.customer.findUnique({
            where:{
                email
            }
        });
    }
    
    async findByUsername(username:string){
        return await prisma.customer.findUnique({
            where:{
                username
            }
        });
    }
    
    async findByUsernameEmail(username:string, email:string){
        return await prisma.customer.findUnique({
            where:{
                username_email:{
                    username,
                    email
                }
            }
        });
    }

    async getOrders(customerId:string){
        return await prisma.customer.findMany({
            select:{
                Order:{
                    select:{
                        value:true,
                        createdAt:true,
                        Order_Product:{
                            select:{
                                product:{
                                    select:{
                                        name:true,
                                        value:true
                                    }
                                }
                            }
                        }
                    }
                }
            },
            where: {
                id:customerId
            }
        })
    }
}