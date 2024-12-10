const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String },
  category: { type: String, required: true },
  image: {type: String},
  rating: {type: Number},
  isWishlisted: {type: Boolean},
});

module.exports = mongoose.model('Product', productSchema);
