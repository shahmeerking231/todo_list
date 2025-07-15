import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB Connected Successfully!');
  } catch (error) {
    console.log('Error connecting to DB:', error);
  }
};

export default connectDB;
