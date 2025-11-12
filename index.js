const express = require('express')
const app = express()
const cors = require('cors')
const {connectDB} = require('./utils/db')
const { authRouter } = require('./routes/auth.route')
const { bookRouter } = require('./routes/books.route')
const { reviewRouter } = require('./routes/review.route')
const { paymentsRouter } = require('./routes/payments.route')
const { orderRouter } = require('./routes/orders.route')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())


// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/books', bookRouter)
app.use('/api/v1/review', reviewRouter)
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/payments', paymentsRouter)



const port = process.env.PORT;

connectDB()
    .then(() => {
        app.listen(port)
        console.log(`port is running on ${port}`)
    })
    .catch((error) => {
        console.log("mongodb connection failed", error)
        process.exit(1)
    })

