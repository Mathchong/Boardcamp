import createCategorySchema from '../schemas/Categories.js'

export default function categoryValidation(req, res, next) {
    const { body } = req

    const validation = createCategorySchema.validate(body)
    if (validation.error) return res.status(400).send(validation.error)

    next()
}