import {Router} from "express";

import categoriesRoute from './categories/index.js';
import gamesRoute from "./games/index.js";
import customerRoute from "./customers/index.js";
import rentalsRoute from "./rentals/index.js"

const router = Router();

router.use('/categories',categoriesRoute);
router.use('/games',gamesRoute);
router.use('/customers', customerRoute);
router.use('/rentals', rentalsRoute)

export default router;