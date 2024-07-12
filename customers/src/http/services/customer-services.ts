import { CustomerRepository } from "../repository/customer-repository";

export class CustomerServices extends CustomerRepository{

    async createNewCustomer(username:string, email:string){
        return await this.create(username, email);
    }


    async findCustomerByUsernameEmail(username:string, email:string){
        return await this.findCustomerByUsernameEmail(username, email);
    }
}