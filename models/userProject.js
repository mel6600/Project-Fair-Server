const mongoose=require('mongoose')

const projectSchema= new mongoose.Schema({
    title:{
type:String,
required:true
    },
    language:{
        type:String,
        required:true
            },
            URL:{
                type:String,
                required:true
                    },
                    gitHub:{
                        type:String,
                        required:true,
                        unique:true

                            },
                            overview:{
                                type:String,
                                required:true
                                    },
                                    projectImage:{
                                        type:String,
                                        required:true
                                            },
                                            userId:{
                                                type:String,
                                                required:true
                                                    },
})

const projects=mongoose.model("projects",projectSchema)
module.exports=projects