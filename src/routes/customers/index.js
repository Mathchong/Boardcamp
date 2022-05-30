import { Router } from "express"

import CustomersController from "../../controllers/customersController/index.js"
import validateParamsId from "../../middlewares/paramsIdValidation.js"
import createCustomerValidation from "../../middlewares/createCustomerValidation.js"

const customerRoute = Router()
const customersController = new CustomersController()

customerRoute.get('/', customersController.getCustomers)
customerRoute.get('/:id', validateParamsId, customersController.getCustomerById)
customerRoute.post('/', createCustomerValidation, customersController.registerCustomer)
customerRoute.put('/:id', validateParamsId, createCustomerValidation, customersController.updateCustomer)

export default customerRoute