// import express from 'express'
// import dotenv from 'dotenv'
// import colors from 'colors'
// import connectDB from './config/db.js'
// import productRoutes from './routes/productRoutes.js'
// import {notFound, errorHandler} from './middleware/errorMiddleware.js'
// dotenv.config()
const express = require('express')

const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const permRoutes = require('./routes/permRoutes')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')
const path = require('path')

const app = express()
dotenv.config()
connectDB()
app.use(express.json())

// app.get('/', (req, res) => {
//   res.send('API is running....')
// })

// app.get('/api/notes', (req, res) => {
//   res.json(notes)
// })

app.use('/api/users', userRoutes)
app.use('/api/perm', permRoutes)

// ----------- deployment -----------

__dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/frontend/build')))
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
	})
} else {
	app.get('/', (req, res) => {
		res.send('API is running..')
	})
}

// ----------- deployment -----------

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started on PORT ${PORT}`))
