const express= require('express')
const userController= require('../Controllers/userController')
const projectController=require("../Controllers/projectController")
const jwtMiddleWare=require('../Middlewares/jwtmiddlewares')
const multerMiddleware = require('../Middlewares/multermiddleware')
const jwtMiddleware = require('../Middlewares/jwtmiddlewares')


const router=new express.Router()
router.post('/register',userController.registercontrol)
router.post('/login',userController.logincontrol)

router.post('/dashboard/add',jwtMiddleWare,multerMiddleware.single('projectImage'),projectController.addProjectcontroller)

router.get('/get-home-projects',projectController.getHomeproject)

router.get('/all-projects',jwtMiddleware,projectController.allProjectsController)

router.get('/user-projects',jwtMiddleware,projectController.alluserController)

router.put('/project/:pid/edit',jwtMiddleWare,multerMiddleware.single('projectImage'),projectController.editProjectController)

router.delete('/project/:pid/remove',jwtMiddleware,projectController.removeProjectController)

router.put('/user/edit',jwtMiddleware,multerMiddleware.single('profilePic'),userController.editProfileController)











module.exports=router


// const express= require('express')
// const userController= require('../Controllers/userController')


// const router=new express.Router()

// router.post('./register',userController.registercontrol)

// module.exports=router

