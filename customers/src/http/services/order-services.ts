import { OrderRepository } from '../repository/order-repository';
import { ProductsValidatedType } from '../adapter/types/products-validated-type';

export class OrderServices extends OrderRepository {

    async createNewOrder(customerId:string, products:ProductsValidatedType[]){
        const finalValue:number = this.calculateFinalValue(products);
        return await this.create(customerId, finalValue, products);

    }

    private calculateFinalValue(products:ProductsValidatedType[]):number{
        return products.reduce((value, product) => value + (product.quantity * product.value), 0)
    }
}