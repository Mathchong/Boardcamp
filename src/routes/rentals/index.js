import { Router } from "express";

import RentalsController from "../../controllers/rentalsController/index.js";
import customerAndGameIdValidation from "../../middlewares/getRentsQueryValidation.js";
import registerRentValidation from "../../middlewares/registerRentValidation.js";

const rentalsRoute = Router()
const rentalsController = new RentalsController()

rentalsRoute.get('/', customerAndGameIdValidation, rentalsController.getRents)
rentalsRoute.post('/', registerRentValidation, rentalsController.registerRent)
rentalsRoute.post('/:id/return', rentalsController.closeRent)
rentalsRoute.delete('/:id', rentalsController.deleteRent)

export default rentalsRoute


