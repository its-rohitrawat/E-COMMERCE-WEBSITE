import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("server is connected to database ✅");
        
    } catch (error) {
        console.log("database connection failed ❎");
        process.exit(1)
        
    }
}

