import { ProductsValidatedType } from "./products-validated-type";

export type MessagePayload = {
    customerId:string;
    orderId:string;
    items:ProductsValidatedType[]
}