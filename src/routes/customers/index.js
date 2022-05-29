import { Router } from "express"

import CustomersController from "../../controllers/customersController/index.js"
import validateUserId from "../../middlewares/customerIdValidation.js"

const customerRoute = Router()
const customersController = new CustomersController()

customerRoute.get('/', customersController.getCustomers)
customerRoute.get('/:id', validateUserId, customersController.getCustomerById)
customerRoute.post('/', customersController.registerCustomer)
customerRoute.put('/:id', customersController.updateCustomer)

export default customerRoute