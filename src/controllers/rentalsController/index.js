import connectDB from "../../app/connectPG.js"
import dayjs from 'dayjs'

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

            if (!allRents) throw new Error({ message: "Error while creating response" })

            res.status(200).send(allRents)
        } catch (error) {
            res.status(400).json({ message: 'error while getting rentals', error: error.message })

        }
    }

    async registerRent(req, res) {
        try {
            const db = await connectDB()

            const { customerId, gameId, daysRented } = req.body

            const customer = await db.query(`SELECT * FROM customers WHERE id = $1`, [customerId])
            if (!customer.rowCount) return res.status(404).json({ message: 'Customer not found', status: 404 })

            const game = await db.query(`SELECT * FROM games WHERE id = $1`, [gameId])
            if (!game.rowCount) return res.status(404).json({ message: 'Game not found', status: 404 })

            const rents = await db.query(`SELECT * FROM rentals where "gameId" = $1`, [gameId])
            if (rents.rowCount >= game.rows[0].stockTotal) return res.status(400).json({ message: 'There is no avaliable games', status: 400 })

            const rentDate = dayjs().format('DDDD-MM-DD')
            const originalPrice = daysRented * game.rows[0].pricePerDay
            const returnDate = null
            const delayFee = null

            await db.query(`INSERT INTO rentals ("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee") VALUES
                            ($1, $2, $3, $4, $5, $6, $7)`, [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee])

            return res.sendStatus(201)

        } catch (error) {
            return res.status(400).json({ message: "error while registering rent" })
        }

    }

    async closeRent(req, res) {
        res.status(200).json({ message: 'return game' })
    }

    async deleteRent(req, res) {
        res.status(200).json({ message: 'delete Rent' })
    }
}

function createAllRentsObject(rentals, gameId, customerId) {
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