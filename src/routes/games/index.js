import { Router } from "express"

import GamesController from '../../controllers/gamesController/index.js'
import gameValidation from '../../middlewares/createGameValidation.js'

const gamesRoute = Router()
const gamesController = new GamesController()

gamesRoute.get('/', gamesController.getGames)
gamesRoute.post('/', gameValidation, gamesController.registerGame)

export default gamesRoute