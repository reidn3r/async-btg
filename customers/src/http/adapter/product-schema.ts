import { z } from 'zod';

export const ProductSchema = {
    schema:{
        body: z.object({
            value: z.number().positive({message:"min. value is 0"}),
            name: z.string()
        })
    }
}