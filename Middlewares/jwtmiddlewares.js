const jwt=require('jsonwebtoken')

const jwtMiddleware =(req,res,next)=>{
const token= req.headers['authorization'].split(" ")[1]
console.log(token);
if(token){
    try {
        jwtresponse=jwt.verify(token,process.env.jwt_password)
        console.log(jwtresponse);
        req.payload=jwtresponse.userId
        next(


        )
        
    } catch (error) {
        res.status(401).json("invalid token...please login")
    }
}
}
module.exports= jwtMiddleware