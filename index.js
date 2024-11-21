require('dotenv').config()
const express= require('express')
const cors= require('cors')

const router= require('./ROUTES/router')
require('./Cnnection/connection')




const pfServer=express()


pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)
pfServer.use('/Uploads',express.static('./Uploads'))



const PORT=3000 || process.env.PORT
pfServer.listen(PORT,()=>{
    console.log(`Project fair started at port${PORT}`);
})
pfServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style='color:red;'>Project fair xxxserver started and waiting for client requesttttt</h1>`)
    })