const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const authRoutes = require('./routes/auth')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5002

//Middleware
app.use(cors())
app.use(express.json())

//MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
    res.send('Task Manager Backend');
  });
  
app.use('./auth',authRoutes)  
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
