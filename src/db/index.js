import mongoose from "mongoose";

const connectDB = async function(){
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("MongoDB connected successfully")

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1)
    }
}

export default connectDB