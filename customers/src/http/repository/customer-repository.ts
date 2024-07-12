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
}