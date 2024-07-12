import { OrderServices } from '../../services/order-services';
import { CustomerServices } from '../../services/customer-services';
import { ProductServices } from '../../services/product-services';
import { RabbitMQ } from '../../../amqp/rabbitmq';

export interface CreateOrderOptions {
    customerServices: CustomerServices;
    productServices: ProductServices;
    orderServices: OrderServices;
    rabbitmq: RabbitMQ;
}