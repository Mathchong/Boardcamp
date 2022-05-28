import Joi from 'joi';

const gameCreationSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().regex(/^(http:\/\/|https:\/\/)/).required(),
    stockTotal: Joi.number().integer().greater(0).required(),
    categoryId: Joi.number().integer().greater(0).required(),
    pricePerDay: Joi.number().integer().greater(0).required()
})

export default gameCreationSchema