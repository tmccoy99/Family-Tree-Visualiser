const mongoose = require('mongoose');

beforeAll((done) => {
  mongoose.connect('mongodb://127.0.0.1:27017/family-tree-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.on('open', function () {
    done();
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
