//require('dotenv').config({path:'./env'})

//import dotenv from "dotenv"
import connectDB from "./db/index.js";







connectDB()
.then(()=>{           //ab hme server(app) ko db se connect krna pdega 
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch(()=>{
    console.log("Mongo db connection failed !! ",err)
})
/*
import express from "express";
const app = express()

(async()=>{
    try {
        mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error",()=>{      //database is connected but may be express app has some error so we wrote this
            console.log("ERRR:",error);
            throw error              
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.error("ERROR: ",error)
        throw err
    }
})()              //Use imdiately invoke function
*/