export default class GamesController{

    async getGames(req, res){
        res.status(200).json({message: 'get games'})
    }

    async registerGame(req, res){ 
        res.status(200).json({message: 'register Game'})
    }
}