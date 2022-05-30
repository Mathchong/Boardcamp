import connectDB from "../../app/connectPG.js"

export default class RentalsController {
    async getRents(req, res) {
        try {
            const db = await connectDB()
            const { queryGameId, queryCustomerId } = res.locals
            const rentals = await db.query(`SELECT rentals.*,customers.name as customername , games.name as gamename,games."categoryId", categories.name as categoryname from rentals
                                      JOIN customers on customers.id = rentals."customerId"
                                      JOIN games on games.id = rentals."gameId"
                                      JOIN categories on categories.id = games."categoryId"`)

            let allRents = createAllRentsObject(rentals, queryGameId, queryCustomerId);
            console.log(allRents)

            if (!allRents) throw new Error({ message: "Error while creating response" })

            res.status(200).send(allRents)
        } catch (error) {
            res.status(400).json({ message: 'error while getting rentals', error: error.message })

        }
    }

    async registerRent(req, res) {
        res.status(200).json({ message: 'rent a Game' })
    }

    async closeRent(req, res) {
        res.status(200).json({ message: 'return game' })
    }

    async deleteRent(req, res) {
        res.status(200).json({ message: 'delete Rent' })
    }
}

function createAllRentsObject(rentals, gameId, customerId) {
    console.log(`Game ID:${gameId}, Customer ID:${customerId}`)
    const allRents = rentals.rows.map(rent => {

        const object = {
            id: rent.id,
            customerId: rent.customerId,
            gameId: rent.gameId,
            rentDate: rent.rentDate,
            daysRented: rent.daysRented,
            returnDate: rent.returnDate,
            originalPrice: rent.originalPrice,
            delayFee: rent.delayFee,

            customer: {
                id: rent.customerId,
                name: rent.customername,
            },

            game: {
                id: rent.gameId,
                name: rent.gamename,
                categoryId: rent.categoryId,
                categoryName: rent.categoryname
            }

        }

        if (customerId && gameId) {
            if (customerId !== rent.customerId) return false;
            if (gameId !== rent.gameId) return false;
            return object
        }

        if (customerId) {
            if (customerId !== rent.customerId) return false;
            return object
        }

        if (gameId) {
            if (gameId !== rent.gameId) return false;
            return object
        }

        return object
    })

    return allRents.filter(rent => rent)

}