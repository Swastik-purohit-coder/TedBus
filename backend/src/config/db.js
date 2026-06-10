const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Trying to connect...');
    console.log(process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Failed');
    console.error(error);
  }
};

module.exports = connectDB;