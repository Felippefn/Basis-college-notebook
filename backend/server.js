const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/noterouter'); // Adjust the path

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Optional: parse URL-encoded bodies

// MongoDB connection
const uri = 'mongodb://localhost:27017/college-notebook'; // Replace with your MongoDB URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.use('/api', noteRoutes);

app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
});
