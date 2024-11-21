const mongoose= require('mongoose')


const connectionString=process.env.connection_string
console.log(connectionString);

mongoose.connect(connectionString).then((res)=>{
    console.log("sucess");
    console.log("yaaayyyy....finally");
    
}).catch((err)=>{
    console.log("failed");
    console.log(err);
    
    
})

// const connectionstring= process.env
// console.log("connection",connectionstring);


