const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer'); // Import Multer
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();

// Define the frontend URL (replace with your actual frontend URL)
const frontendUrl = 'http://localhost:64679'; // Change this to your actual frontend URL

// Middleware
app.use(cors({
  origin: frontendUrl,  // Only allow this origin to make requests
}));

app.use(express.json()); // Built-in JSON parsing

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory to store uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Routes
app.use('/api/products', upload.single('image'), productRoutes); // Apply Multer middleware to product routes

// ... rest of your code