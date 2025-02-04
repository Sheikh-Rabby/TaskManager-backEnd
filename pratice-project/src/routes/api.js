const express=require('express');
const ProFileControllers=require("../controllers/ProFileControllers");
const TodoControllers=require("../controllers/TodolistControllers");
const AuthVerifyMiddleware=require("../middleware/AuthVerifyMiddleware");
const router= express.Router()

router.post("/CreateProfile",ProFileControllers.CreateProfile)
router.post("/UserLogin",ProFileControllers.UserLogin)
router.get("/SelectProfile",AuthVerifyMiddleware,ProFileControllers.SelectProfile)
router.post("/UpdateProfile",AuthVerifyMiddleware,ProFileControllers.UpdateProfile)


router.post("/CreateToDo",AuthVerifyMiddleware,TodoControllers.CreateToDo)
router.get("/SelectToDo",AuthVerifyMiddleware,TodoControllers.SelectToDo)
router.post("/UpdateToDo",AuthVerifyMiddleware,TodoControllers.UpdateToDo)
router.post("/UpdateToDoStatus",AuthVerifyMiddleware,TodoControllers.UpdateToDoStatus)
router.post("/RemoveToDo",AuthVerifyMiddleware,TodoControllers.RemoveToDo)
router.post("/SelectToDoByStatus",AuthVerifyMiddleware,TodoControllers.SelectToDoByStatus)
router.post("/SelectToDoByDate",AuthVerifyMiddleware,TodoControllers.SelectToDoByDate)





module.exports=router;