import { z } from 'zod';

export const CustomerSchema = {
    schema:{
        body: z.object({
            username: z.string(),
            email: z.string().email()
        })
    }
}
