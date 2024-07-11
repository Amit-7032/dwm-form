const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const formRoutes = require('./routes/formRoutes');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Use cors middleware

// Connect to MongoDB
// { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Use routes
app.use('/api', formRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
