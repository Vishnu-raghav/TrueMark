import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    registerUser,
    changeCurrentPassword,
    getCurrentUser
 } from "../controllers/authController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

//secure routes

router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refreshToken").post(refreshAccessToken)
router.route("/changePassword").post(verifyJWT,changeCurrentPassword)
router.route("/getCurrentUser").get(verifyJWT,getCurrentUser)





export default router