import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRouter from './routes/auth.route.js'
import usersRouter from './routes/users.route.js'
import listingRouter from './routes/listing.route.js'
import cookieParser from 'cookie-parser'
dotenv.config()

mongoose.connect(process.env.MONGO).then(() => {
    console.log("connected to db")
}).catch((err) => {
    console.log(err)
})

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/user', usersRouter)
app.use('/api/auth', authRouter)
app.use('/api/listing', listingRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({ success: false, message, statusCode })
})

app.listen(8000, () => {
    console.log('Server is running on port 8000')
})