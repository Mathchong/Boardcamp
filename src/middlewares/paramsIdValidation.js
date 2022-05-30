export default function validateParamsId (req, res, next) {
    let id = parseInt(req.params.id, 10)

    if (!id) return res.status(404).send({ message:'ID not Found', status: 404 })
    if (id<=0) return res.status(404).send({ message:'ID not Found', status: 404 })
    
    res.locals.id = id
    
    next()
}