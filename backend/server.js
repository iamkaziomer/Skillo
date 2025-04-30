const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
require('dotenv').config()

// mouting routes 
const UserRoutes = require('./routes/user.route.js')
const skillRoutes = require('./routes/skill.route.js')
const homeRoutes = require('./routes/home.route.js')

// Mongo DB Connections
mongoose.connect(process.env.MONGO_DB_URL, {
    
}).then(response=>{
    console.log('MongoDB Connection Succeeded.')
}).catch(error=>{
    console.log('Error in DB connection: ' + error)
});


// Middleware Connections
app.use(cors())
app.use(express.json())


// Routes
app.use('/api/user',UserRoutes)
app.use('/api/skill',skillRoutes)
app.use('/api/home',homeRoutes)

// Connection
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log('App running in port: '+PORT)
})

app.get('/',(req,res)=>{
    res.send('backend is running')
})

