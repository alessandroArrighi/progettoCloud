import * as authController from "../controllers/auth-controller.js"
import { Router } from "express"

const router = Router()

router.use("/api/auth/signin", authController.registerUser)
router.use("/api/auth/login", authController.loginUser)
router.use("/api/auth/logout", authController.logoutUser)
router.use("/api/auth/getUser", authController.getUser)
router.use("/api/auth/mod/password", authController.modifyPassword)
router.use("/api/auth/loggedIn", authController.isLoggedIn)
router.use("/api/auth/adminLoggedIn", authController.isAdminLoggedIn)

export default router