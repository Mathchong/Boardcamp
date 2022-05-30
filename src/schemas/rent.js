import Joi from "joi";

const registerRentSchema = Joi.object({
    customerId: Joi.number().greater(0).required(),
    gameId: Joi.number().greater(0).required(),
    daysRented: Joi.number().greater(0).required()
})

export default registerRentSchema