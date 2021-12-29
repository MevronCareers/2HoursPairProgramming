const mongoose = require('mongoose');

module.exports = async () => {
  console.log(`Connecting to database`);
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`Connected to database`);
  } catch (error) {
    console.log('connection error', error.message);
    process.exit(1);
  }
};
