import { Router } from "express";

import CategoriesController from "../../controllers/categoriesController/index.js";
import categoryValidation from "../../middlewares/createCategoryValidation.js";

const categoriesRoute = Router()
const categoriesController = new CategoriesController()

categoriesRoute.get('/', categoriesController.getCategories)
categoriesRoute.post('/', categoryValidation, categoriesController.createCategory)

export default categoriesRoute;