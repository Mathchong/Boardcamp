import connectDB from "../../app/connectPG.js"

export default class GamesController {

    async getGames(req, res) {
        try {
            const db = await connectDB();
            const queryName = req.query.name ? `${req.query.name}%` : `%`

            const games = await db.query(`SELECT games.*, categories.name as "categoryName" FROM games
                            JOIN categories ON categories.id = games."categoryId"
                            WHERE games.name LIKE $1`, [queryName])

            res.status(200).send(games.rows)
        } catch (error) {
            res.status(400).json({ message: 'Error while getting games', status: 400, error });
        }
    }

    async registerGame(req, res) {
        try {
            const { name, image, stockTotal, categoryId, pricePerDay } = req.body
            const db = await connectDB();

            const categoryExists = await db.query('SELECT * FROM categories where id = $1', [categoryId])
            if (!categoryExists.rowCount) return res.status(400).json({ message: 'Categorie does not exists', status: 400 })

            const nameExists = await db.query(`SELECT * FROM games WHERE name = $1 `, [name])
            if (nameExists.rowCount) return res.status(409).json({ message: 'Already have a game with this name', status: 409 })

            await db.query(`INSERT INTO games(name, image, "stockTotal", "categoryId", "pricePerDay") VALUES
                ($1, $2, $3, $4, $5)`, [name, image, stockTotal, categoryId, pricePerDay])

            res.status(200).json({ message: 'register Game' })

        } catch (error) {
            res.status(400).json({ message: 'Error while game register', error, status: 400 })
        }

    }
}