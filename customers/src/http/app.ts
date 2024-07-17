import fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { CreateCustomer } from './routes/create-customer';
import { CreateProduct } from './routes/create-product';
import { CreateOrder } from './routes/create-order';
import { GetOrderList } from './routes/get-order-list';
import { CustomerServices } from './services/customer-services';
import { OrderServices } from './services/order-services';
import { ProductServices } from './services/product-services';
import { RabbitMQ } from '../amqp/rabbitmq';
import { GetTotalOrderValue } from './routes/get-order-total-value';
import { GetOrdersAmount } from './routes/get-order-amount';

//Fastify Instance
const app = fastify();
const amqp_uri:string = process.env.AMQP_URI as string;

//Schema validator and serializer
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

//Services
const customerServices = new CustomerServices();
const productServices = new ProductServices();
const orderServices = new OrderServices();
const rabbitmq = new RabbitMQ(amqp_uri);

//Routes
app.register(CreateCustomer, { customerServices });
app.register(CreateProduct, { productServices });
app.register(CreateOrder, { orderServices, customerServices, productServices, rabbitmq });
app.register(GetOrderList, { customerServices });
app.register(GetTotalOrderValue);
app.register(GetOrdersAmount);

const PORT:number = 3000;
app.listen({ port: PORT }, async() => {
    await rabbitmq.start();
    console.log(`customer-service: http://localhost:${PORT}`);
})