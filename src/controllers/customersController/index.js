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
        try {
            const db = await connectDB()
            console.log('Connected')
            const { name, phone, cpf, birthday } = req.body
            console.log('destructured')

            const existingCpf = await db.query(`SELECT * from customers WHERE cpf = $1`, [cpf])
            console.log(`consulted existing cpf $1`,[existingCpf])
            if (existingCpf.rowCount) return res.status(409).json({ message: "already have a customer with this CPF", status: 409 })
            console.log('checked if did exists')

            await db.query(`INSERT INTO customers (name, phone, cpf, birthday) 
                            VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday])
            console.log('saved')

            return res.sendStatus(201)
        } catch (error) {
            return res.status(400).json({ message: 'Error while registering customer' , error: error })
        }
    }

    async updateCustomer(req, res) {
        res.status(200).json({ message: 'update a customer register' })
    }
}