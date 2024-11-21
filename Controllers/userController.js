const users= require('../models/userModel')
const jwt= require('jsonwebtoken')




exports.registercontrol=async (req,res)=>{
console.log("control here");
const {username,email,password}=req.body;
console.log(username,email,password);


try {
    const existingUser= await users.findOne({email})
    if(existingUser){
        res.status(406).json("Account already exists, .............please login")
    }
    else{
 const       newUser= new users({
    username,email,password,github:'',linkedin:'',profilepic:''
 })
 await newUser.save()
 res.status(200).json(newUser)
    }
} catch (error) {
   res.status(401).json(error)
    
}


}

exports.logincontrol=async(req,res)=>{
   console.log("control in login control");
   
const {email,password}=req.body
console.log(email,password);


try {
 const  existingUser= await users.findOne({email,password})
   if(existingUser){
      const token= jwt.sign({userId:existingUser._id},process.env.jwt_password)
      res.status(200).json({
         user:existingUser,
         token
      })
   }
   else{
      res.status(404).json("username or password is wrong")
   }
} catch (error) {
   res.status(401).json(error)

   
}

}



exports.editProfileController = async (req,res)=>{
   console.log("Inside editProfileController");
   const {username,email,password,github,linkedin,profilePic} = req.body
   const uploadImg = req.file?req.file.filename:profilePic
   const userId = req.payload

   try {
       const updatedUser = await users.findByIdAndUpdate({_id:userId},{
           username,email,password,github,linkedin,profilePic:uploadImg
       },{new:true})
       await updatedUser.save()
       res.status(200).json(updatedUser)
   } catch (error) {
       res.status(401).json(error)
   }
}


exports.editUserAPI = async (reqBody,reqHeader)=>{
   return await commonAPI("PUT",`${SERVERURL}/user/edit`,reqBody,reqHeader)
}




































// exports.userRegistercontroller=async(req,res)=>{
//    console.log("constrol in registrercontroller");
   
//  const  {username,email,password}=req.body
// try {
//    const existingUser=await users.findOne({email})
//    if(existingUser){
//       res.status(406).json("account already exists")

//    }
//    else{
//       newUser= new users({
//          username,

//          email,

//          password,

//          github:"",

//          linkedin:"",

//          profilepic:""


//       })
//    await   newUser.save()
//    res.status(200).json(newUser)
//    }
// } catch (error) {
//    console.log(error);
   
// }

// }