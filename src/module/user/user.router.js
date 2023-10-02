


import { Router } from "express"; 
import { asyncHandler } from "../../utiles/errorhandeling.js";
import * as usercontroller from './user.controller.js'

const router = Router()

router.post('/add',asyncHandler(usercontroller.addUser))




router.post('/login',asyncHandler(usercontroller.login))


export default router 