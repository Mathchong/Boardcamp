export default function customerAndGameIdValidation(req, res, next) {
    let { gameId, customerId } = req.query

    gameId = parseInt(gameId, 10)
    customerId = parseInt(customerId, 10)

    if (gameId) {
        if (gameId <= 0) return res.status(404).send({ message: 'invalid game id', status: 404 })
        res.locals.queryGameId = gameId
    }

    if (customerId) {
        if (customerId <= 0) return res.status(404).send({ message: 'invalid customer id', status: 404 })
        res.locals.queryCustomerId = customerId
    }

    next();

}