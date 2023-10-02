

import { Router } from "express";

const router = Router()




import * as controller from'./news.controller.js'
import { asyncHandler } from "../../utiles/errorhandeling.js";
import { fileUpload } from "../../utiles/multer.js";



router.post('/add'   ,fileUpload({}).single('image'),asyncHandler(controller.addnews))





router.get('/get'   ,asyncHandler(controller.getnews))


router.post('/delete' ,asyncHandler(controller.deletenew))
router.post('/search' ,asyncHandler(controller.searchnews))
router.post('/problem',asyncHandler(controller.problem))





export default router