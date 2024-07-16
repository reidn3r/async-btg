import { ProductsValidatedType } from './products-validated-type';

export type MessagePayload = {
    orderId:string;
    customerId:string;
    items: ProductsValidatedType[]
}