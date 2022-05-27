export default class CustomersController{
    async getCustomers(req, res){
        res.status(200).json({message: 'get Customers'})
    }

    async getCustomerById(req, res){
        res.status(200).json({message: 'get Customer by ID'})
    }

    async registerCustomer(req, res){ 
        res.status(200).json({message: 'register a new Customer'})
    }

    async updateCustomer(req, res){
        res.status(200).json({message: 'update a customer register'})
    }
}
