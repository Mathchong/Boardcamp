import dayjs from 'dayjs'

import CreateCustomerSchema from '../schemas/Customer.js'

export default function createCustomerValidation(req, res, next) {
    let { body } = req
    
    const validateBirthday = formatingDate(body.birthday)
    if (!validateBirthday) return res.status(400).json({ message: 'Invalid date format' })

    body.birthday = validateBirthday

    console.log(body)
    const validate = CreateCustomerSchema.validate(body, { abortEarly: false })
    if (validate.error) return res.status(400).json({ message: 'Body with different schema', error: validate.error, status: 400 })

    next()
}

function formatingDate(dateString) {
    const dateNoBars = /^\d{8}$/;
    const dateBars = /^\d{4}-\d{2}-\d{2}$/;

    if (dateNoBars.test(dateString)) {
        let day = dayjs().year(dateString.slice(4, 9)).month(dateString.slice(2, 4) - 1).date(dateString.slice(0, 2)).format('DDMMYYYY')

        if (dateString == day) return dayjs().year(dateString.slice(4, 9)).month(dateString.slice(2, 4) - 1).date(dateString.slice(0, 2)).format('YYYY-MM-DD')

    }
    if (dateBars.test(dateString)) {

        let day2 = dayjs().year(dateString.slice(0, 4)).month(dateString.slice(5, 7) - 1).date(dateString.slice(8, 10)).format('YYYY-MM-DD')
        console.log(day2)
        console.log(dateString)
        if (dateString == day2) return day2
    } 
    
    return false
}