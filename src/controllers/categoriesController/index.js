export default class CategoriesController{
    async getCategories(req, res) {
        res.status(200).json({message: 'getCategories'})
    }

    async createCategory(req, res){
        res.status(200).json({message: 'createCategory'})
    }
}