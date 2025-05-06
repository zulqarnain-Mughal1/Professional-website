import {Router} from "express";
import { upload } from "../middleware/multer.middleware.js";
import { registerUser } from "../controllers/user.controller.js";


const router = Router()

router.route("/register").post(  (req, res, next) => {
    console.log("➡️ Multer middleware hit!");
    next();
  },
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
    )

    export default router