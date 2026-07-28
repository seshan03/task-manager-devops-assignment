import mongoose from "mongoose";

const connectDatabase = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  try {
    // Modern Mongoose (>=6) manages connection options internally.
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    // exit so the process doesn't run in a broken state
    process.exit(1);
  }
};

export default connectDatabase;