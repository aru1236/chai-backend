import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema({

    username:{
        type:String,
        required: true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required: true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullName:{
        type:String,
        required: true,
        trim:true,
        index:true
    },
    avatar:{
        type:String, //cloudinary url where we store our photos or vedios we cant store these in db we store it it external
        required:true,
    },
    coverImage:{
        type:String, //cloudinary url
    },
    watchHistory:{
        type: Schema.Types.ObjectId,
        ref:"Video"
    },
    password:{
        type:String, 
        required:[true, 'Password is required']
    },
    refreshToken:{
        type:String, 
    },
},{timestamps:true})

//so encryption will done by using hook which is used before we save data in db so we use these midlleware
//before the data saving
userSchema.pre("save",async function(next){

    //now we create a problem where pswd will encrypt all the time if user change the pic or profile pswd will 
    //automatically encrypt all time so we want pswd will only encrpt when we modify pswd field so only in that case 
    //run this code
    if(!this.isModified("password")) return next()  //agr modify nhi hua to sidha bahar nikal jao
    this.password = bcrypt.hash(this.password,10) //10 is a round kitne rounds mai save hoga
    next() // next flag de do ki kencrypt ho gya
})

//now we make some methods coz we give pswd in clear text form and in db we have encrypted pswd so bcrypt will compare 
//these pwsd that pswd is correct or not

userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password,this.password)  //pwd = text pswd , this.pswd = encrypted pswd in db
}

userSchema.methods.generateAccessToken = async function(){
   return jwt.sign(
        {
        _id: this.id,
        email:this.email,
        username:this.username,
        fullName:this.fullName
       },
       process.env.ACCESS_TOKEN_SECRET,
       {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
       }
    )
}
userSchema.methods.generateRefreshToken = async function(){
    return jwt.sign(
        {
        _id: this.id,
       
       },
       process.env.REFRESH_TOKEN_SECRET,
       {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
       }
    )
}
export const User = mongoose.model("User",userSchema)