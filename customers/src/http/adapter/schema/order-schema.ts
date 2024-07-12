import { z } from 'zod'

export const OrderSchema = {
    schema:{
        body: z.object({
            email: z.string().email(),
            products: z.array(z.object({
                name: z.string(),
                quantity: z.coerce.number().int().positive({message:"min. quantity is 0"})
            })),
        })
    }
}