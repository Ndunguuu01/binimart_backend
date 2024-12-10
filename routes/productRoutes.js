const express = require('express');
const multer = require('multer'); // Import Multer

const Product = require('../models/product'); // Assuming Product model is in ../models/product.js
const router = express.Router();

// Multer Storage Configuration (adjust paths as needed)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory to store uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new product with image upload
router.post('/', upload.single('image'), async (req, res) => {
  const { name, price, quantity, description, category } = req.body;
  const image = req.file ? req.file.path : null; // Check if image exists

  const product = new Product({
    name,
    price,
    quantity,
    description,
    category,
    image // Store the image path or null if no image uploaded
  });

  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;