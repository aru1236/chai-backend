import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"   //now we have to configure these

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))   //these are middlewares so we write use when we want middleware

//we make some settings so that our server will never crash we set some limit on data
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public")) //when we want to store data in the form of pdf in public folder

app.use(cookieParser())
export {app}