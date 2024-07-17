import { z } from 'zod';

export const UUIDParams = {
    schema:{
        params: z.object({
            id: z.string().uuid()
        })
    }
}