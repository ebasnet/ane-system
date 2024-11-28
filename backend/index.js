require('dotenv').config();
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const PORT = process.env.PORT || 9090
const app = express()

// Middlewares
app.use(express.json())
app.use(cors());

mongoose.connect('mongodb+srv://ebasnet:ebasnet@cluster0.rv9he.mongodb.net/').then( res => {
    console.log("Database Connected")
}).catch ( error => {
    console.log("MONGODB Server error!\n", error)
})

app.listen(PORT, ()=> {
    console.log("\nServer is running on PORT:", PORT)
});

app.get('/', (req,res)=> {
    res.send("Server Status: Running...")
});


//for handling login and Signup
app.use('/api/handleuser', require('./routes/handleuser'))

//for handling form registration
app.use('/api/register', require('./routes/handleRegistration'))

//for handling all data in dashboard
app.use('/api/dashboard', require('./routes/handleDashboard'))

//for handling notices in dashboard
app.use('/api/dashboard/notices', require('./routes/handleNotices'))
