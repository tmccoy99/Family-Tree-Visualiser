const mongoose = require('mongoose');

async function connectToDatabase() {
  return new Promise((resolve, reject) => {
    mongoose.connect('mongodb://127.0.0.1:27017/family-tree-test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    db.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      reject(err);
    });
    db.on('open', () => {
      console.log('MongoDB connection established');
      resolve();
    });
  });
}

module.exports = connectToDatabase;
