//in the type of promises-1
const asyncHandler = (requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandler).reject((err)=>next(err))
    }
}

export {asyncHandler}



//try catch type -2
/*const asyncHandler = (fn) =>async(req,res,next) =>{
    try {
        await fn(req,res,next)
    } catch (error) {
        res.status(err.code || 500).json({
            success:false,
            message:err.message
        })
    }
}   */    //asynchandler is higher order func jo fun ko as paramet vhi acpt kr lete ya return ker skte
//fn inside the function coz its a higher order func