const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); 
const taskRoutes = require('./routes/tasks');
const { BASE_URL } = require('../../src/utills/api');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// app.use(cors({
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], 
// }));

//app.use(cors());

app.use(cors({
  origin: BASE_URL,
  credentials: true,
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Task Manager Backend');
});

app.use('/auth', authRoutes); 
app.use('/tasks',taskRoutes)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));