const express = require('express')

// Express App
const app = express()

// Enable Server
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`SERVER STARTED ON ${port}...`)
})

// Set static Files
app.use(express.static('client'))

// Middle ware To parse request body
app.use(express.json())