import connectDB from '../../app/connectPG.js'

export default class CategoriesController {

    async getCategories(req, res) {
        try {
            const db = await connectDB()
            const categories = await db.query('SELECT * FROM categories');
            res.status(200).send(categories.rows)
        } catch (e) {
            res.status(500).json({ message: 'error', e })
        }

    }

    async createCategory(req, res) {
        try {
            const { name } = req.body
            if (!name) return res.status(400).json({ message: 'name cannot be null', status: 400 })

            const db = await connectDB()
            const create = await db.query('INSERT INTO categories (name) VALUES ($1)',[name])

            res.status(201).json({ message: 'createdCategory' })

        } catch (error) {
            res.status(500).json({ message: 'error durin Creation', error })
        }

    }
}