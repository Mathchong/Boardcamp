import { Router } from "express";

import RentalsController from "../../controllers/rentalsController/index.js";

const rentalsRoute = Router()
const rentalsController = new RentalsController()

rentalsRoute.get('/', rentalsController.getRents)
rentalsRoute.post('/', rentalsController.registerRent)
rentalsRoute.post('/:id/return', rentalsController.closeRent)
rentalsRoute.delete('/:id', rentalsController.deleteRent)

export default rentalsRoute