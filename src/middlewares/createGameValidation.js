import gameCreationSchema from "../schemas/Games.js";

export default function gameValidation(req,res,next) {
    const {body} = req
    

    const validation = gameCreationSchema.validate(body,{abortEarly: false})
    if(validation.error) return res.status(400).json({message: 'Body format invalid', errors: validation.error , status: 400})

    next()
}