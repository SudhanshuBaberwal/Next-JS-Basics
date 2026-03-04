import express, { Router } from "express"
import { checkAuth, forgotPassword, login, logout, resetPassword, signup, verifyEmail } from "../controllers/user.controller";
import verifyToken from "../middlewares/verifyToken";

const authRoute : Router  = express.Router()

authRoute.get("/check-auth" , verifyToken , checkAuth)
authRoute.post("/signup" , signup)
authRoute.post("/login" , login)
authRoute.get("/logout", logout)
authRoute.post("/verify-email" , verifyEmail)
authRoute.post("/forgot-password" , forgotPassword)
authRoute.post("/reset-password/:token" , resetPassword)

export default authRoute;