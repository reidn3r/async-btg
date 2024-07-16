import { z } from 'zod';

export const GetOrderSchema = {
    schema: {
        params: z.object({
            id: z.string().uuid()
            })
    }
}