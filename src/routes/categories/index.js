import { Router } from "express";

import CategoriesController from "../../controllers/categoriesController/index.js";

const categoriesRoute = Router()
const categoriesController = new CategoriesController()

categoriesRoute.get('/', categoriesController.getCategories)
categoriesRoute.post('/', categoriesController.createCategory)

export default categoriesRoute;