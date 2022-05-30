import { Router } from "express";

import RentalsController from "../../controllers/rentalsController/index.js";
import customerAndGameIdValidation from "../../middlewares/getRentsQueryValidation.js";
import registerRentValidation from "../../middlewares/registerRentValidation.js";
import validateParamsId from "../../middlewares/paramsIdValidation.js";

const rentalsRoute = Router()
const rentalsController = new RentalsController()

rentalsRoute.get('/', customerAndGameIdValidation, rentalsController.getRents)
rentalsRoute.post('/', registerRentValidation, rentalsController.registerRent)
rentalsRoute.post('/:id/return',validateParamsId, rentalsController.closeRent)
rentalsRoute.delete('/:id', validateParamsId, rentalsController.deleteRent)

export default rentalsRoute


