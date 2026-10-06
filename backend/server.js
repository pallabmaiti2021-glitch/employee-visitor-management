require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const visitorRoutes = require('./routes/visitorRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => res.json({ message: 'Employee Visitor Management API is running' }));
app.use('/api/visitors', visitorRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
