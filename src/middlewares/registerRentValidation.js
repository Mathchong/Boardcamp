import registerRentSchema from "../schemas/rent.js";

export default function registerRentValidation(req, res, next) {
    const { body } = req

    const validation = registerRentSchema.validate(body, { abortEarly: false })
    if (validation.error) return res.status(400).json({ message: 'invalid body schema', error: validation.error, status: 400 })

    next();
}