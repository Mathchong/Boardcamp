import connectDB from '../../app/connectPG.js'

export default class CategoriesController {

    async getCategories(req, res) {
        try {
            const db = await connectDB()
            const categories = await db.query('SELECT * FROM categories');
            res.status(200).send(categories.rows )
        } catch (e) {
            res.status(500).json({message: 'error', e})
        }
        
    }

    async createCategory(req, res) {
        res.status(200).json({ message: 'createCategory' })
    }
}