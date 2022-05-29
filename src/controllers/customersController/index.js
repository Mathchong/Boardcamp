import connectDB from "../../app/connectPG.js"

export default class CustomersController {
    async getCustomers(req, res) {
        try {
            const db = await connectDB()
            const queryCpf = req.query.cpf ? `${req.query.cpf}%` : '%'

            const customers = await db.query(`SELECT * FROM customers     
                                              WHERE cpf LIKE $1`, [queryCpf])

            return res.status(200).send(customers.rows)
        } catch (error) {
            res.status(400).json({ message: 'Error while getting customers' })
        }
    }

    async getCustomerById(req, res) {
        try {
            const db = await connectDB()
            const id = res.locals.id
            const customer = await db.query(`SELECT * from customers WHERE id = $1`, [id])

            if (!customer.rowCount) return res.status(404).json({ message: 'Customer not found', status: 404 })

            return res.status(200).send(customer.rows)

        } catch (error) {
            res.status(400).json({ message: 'Error while getting customer' })
        }
    }

    async registerCustomer(req, res) {
        res.status(200).json({ message: 'register a new Customer' })
    }

    async updateCustomer(req, res) {
        res.status(200).json({ message: 'update a customer register' })
    }
}