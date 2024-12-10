const mongoose = require('mongoose');

mongoose.connect('your_mongo_connection_string', {
  // No need for useNewUrlParser or useUnifiedTopology
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch((err) => {
  console.error('❌ Error connecting to MongoDB:', err);
});
