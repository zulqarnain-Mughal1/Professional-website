import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: "../.env"})
    console.log("MONGODB_URI:", process.env.MONGODB_URI);  // ⬅️ Ye line add karo


connectDB().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch((error) => {
    console.error("Error starting the server:", error);
    process.exit(1);
})