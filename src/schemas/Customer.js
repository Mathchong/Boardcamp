import Joi from "joi";

const CreateCustomerSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().regex(/(\d{10}|\d{11})/).required(),
    cpf: Joi.string().regex(/\d{11}/).required(),
    birthday: Joi.date().iso().required()
});

export default CreateCustomerSchema;