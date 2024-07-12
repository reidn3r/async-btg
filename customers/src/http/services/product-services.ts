import { ProductRepository } from "../repository/product-repository";

export class ProductServices extends ProductRepository{

    async findProductByName(name:string){
        return this.findByName(name);
    }
}