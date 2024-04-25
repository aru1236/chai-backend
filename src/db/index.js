import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"

const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB conection error",error);
        process.exit(1)   //current application is running in some process so this is the refrence of this process
        
    }
}

    

export default connectDB