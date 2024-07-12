import { Connection, Channel, connect, Message } from "amqplib";

export class RabbitMQ{
    private conn:Connection;
    private channel:Channel;

    constructor(private uri:string){}

    async start():Promise<void>{
        this.conn = await connect(this.uri);
        this.channel = await this.conn.createChannel();
        console.log("RabbitMQ started.");
    }

    async publishExchange(exchange:string, routingKey:string, message:string):Promise<boolean>{
        return await this.channel.publish(exchange, routingKey, Buffer.from(message));
    }

    async consume(queue:string, callback: (message: Message) => void){
        return this.channel.consume(queue, (payload) => {
            callback(payload);
            this.channel.ack(payload);
        })
    }
    
}