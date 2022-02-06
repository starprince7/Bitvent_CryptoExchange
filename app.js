const express = require('express')
const mongoose = require('mongoose')
const apiRouter = require('./routes/apiRouter')
// require('dotenv').config()

// Express App
const app = express()

// PORT
const port = process.env.PORT || 5000

// Connect to a Database
const databaseURI = process.env.DB_URI
const databaseConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true
}

// Enable Server After DB is connected
async function connectToDatabase() {
    try {
        const databaseIsConnected = await mongoose.connect(databaseURI, databaseConfig)
        if (databaseIsConnected) {
            console.log('Connected to DB!')
            app.listen(port, () => {
                console.log(`Server started on port --> ${port}`)
            })
        }
    }
    catch (e) {
        console.log('ERROR COULD NOT CONNECT TO DATABASE >>>', e)
    }
}
connectToDatabase()

// Make the Client files Public
app.use(express.static("client/react-app/build"));
  
app.get("*", (req, res) => {
  console.log("req just came in to load up React client/react-app/build - Files ");
  res.sendFile("./client/react-app/build/index.html", { root: __dirname });
});

// Middle ware To parse request body
app.use(express.json())
// API Routes
app.use('/api', apiRouter)


