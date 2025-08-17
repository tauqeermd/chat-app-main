import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

const connectToMongoDB = async (req, res) =>{
    try {
        console.log('hello')
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message);
    }
}

export default connectToMongoDB;