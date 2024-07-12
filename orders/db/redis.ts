import { createClient } from 'redis';

export const redis = createClient()
    .on('error', (err) => { throw new Error(err.message) })
    .on('connect', (msg) => console.log("Redis connected"));