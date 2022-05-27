import {Router} from "express"

import GamesController from '../../controllers/gamesController/index.js'

const gamesRoute = Router()
const gamesController = new GamesController()

gamesRoute.get('/', gamesController.getGames)
gamesRoute.post('/', gamesController.registerGame)

export default gamesRoute