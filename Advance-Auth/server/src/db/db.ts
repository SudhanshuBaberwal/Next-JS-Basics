import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const connectionString = process.env.DB_LINK;

    if (!connectionString) {
      throw new Error("DB_LINK is not defined in .env file");
    }

    await mongoose.connect(connectionString);

    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.log("Error in connectDB function:", error);
    process.exit(1);
  }
};

export default connectDB;