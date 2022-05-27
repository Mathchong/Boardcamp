export default class RentalsController{
async getRents(req, res){
        res.status(200).json({message: 'get rents'})
    }

    async registerRent(req, res){
        res.status(200).json({message: 'rent a Game'})
    }

    async closeRent(req, res){
        res.status(200).json({message: 'return game'})
    }

    async deleteRent(req, res){
        res.status(200).json({message: 'delete Rent'})
    }
}