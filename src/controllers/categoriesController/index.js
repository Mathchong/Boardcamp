import connectDB from '../../app/connectPG.js'

export default class CategoriesController {

    async getCategories(req, res) {
        try {
            const db = await connectDB()
            const categories = await db.query('SELECT * FROM categories ORDER BY name ASC');
            res.status(200).send(categories.rows)
        } catch (e) {
            res.status(500).json({ message: 'error', e })
        }
    }

    async createCategory(req, res) {
        try {
            const { name } = req.body
            const db = await connectDB()

            const categoryExists = await db.query('SELECT * FROM categories where name = $1', [name])
            if (categoryExists.rowCount) return res.status(409).json({ message: 'Categorie Name already exists', status: 409 })

            await db.query('INSERT INTO categories (name) VALUES ($1)', [name])

            res.status(201).json({ message: 'createdCategory' })

        } catch (error) {
            res.status(500).json({ message: 'error durin Creation', error })
        }
    }
}