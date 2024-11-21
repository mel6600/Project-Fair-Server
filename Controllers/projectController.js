const { restart } = require('nodemon');
const projects= require('../models/userProject')


exports.addProjectcontroller=async(req,res)=>{
    console.log("control in addprojectcontrol");
    
   const {title,language,gitHub,URL,overview}=req.body
   const userId=req.payload
   const projectImage=req.file.filename
   console.log(title,language,gitHub,URL,overview,userId,projectImage);
   
  
   try {
    const existingProject= await projects.findOne({gitHub})
    if(existingProject){
        res.status(406).json("Project data already exists,please upload a new one")
    }
    else{
        const newProject= new projects({
            title,

            language,
            URL,
            gitHub,
            overview, 
            projectImage,

            userId
            


        })
        await newProject.save()
        res.status(200).json(newProject)
    }
   } catch (error) {
    res.status(401).json(error)
   }

}

//get home projects
exports.getHomeproject=async(req,res)=>{
    console.log("inside gethome projects");
    try {
        const homeProjects=await projects.find().limit(3)
        res.status(200).json(homeProjects)
    } catch (error) {
        res.status(401).json(error)
    }
    
}


//all projects

exports.allProjectsController=async(req,res)=>{
    console.log("Inside all projects");
    const search = req.query.search
    const query = {
        language: {
            $regex:search,$options:"i"
        }
    }
    try {
        const allProjects=await projects.find(query)
        res.status(200).json(allProjects)
    } catch (error) {
        res.status(401).json(error)
    }
    
}







exports.alluserController=async(req,res)=>{
    console.log("Inside user projects");
    const userId=req.payload
    try {
        const userProjects=await projects.find({userId})
        res.status(200).json(userProjects)
    } catch (error) {
        res.status(401).json(error)
    }
    
}

exports.editProjectController=async(req,res)=>{
    console.log("inside editProjectcontroller");
    const{pid}=req.params
    const {title,language,gitHub,URL,overview,projectImage}=req.body
    // console.log(req.body);
    
    const uploadImage=req.file?req.file.filename:projectImage
  console.log(uploadImage);
  
    
    const userId=req.payload
    try {
        const updatedProject= await projects.findByIdAndUpdate({_id:pid},{
            title,

            language,
            URL,
            gitHub,
            overview, 
            projectImage:uploadImage,

            userId
            
        },{new:true})
        await updatedProject.save()
       res.status(200).json(updatedProject)
    } catch (error) {
        res.status(401).json(error)
    }

    
}


exports.removeProjectController=async(req,res)=>{

    console.log("inside remove project controller");
    const {pid}= req.params
    try {
        const removeProject= await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(removeProject)
    } catch (error) {
        res.status(401).json(error)
    }
}