import * as authController from "./auth-controller"
import { Router } from "express"

const router = Router()

router.post("/api/auth/signin", authController.registerUser)
router.post("/api/auth/login", authController.loginUser)
router.post("/api/auth/logout", authController.logoutUser)
router.get("/api/auth/getUser", authController.getUser)
router.post("/api/auth/mod/password", authController.modifyPassword)
router.get("/api/auth/loggedIn", authController.isLoggedIn)
router.get("/api/auth/adminLoggedIn", authController.isAdminLoggedIn)

export default router
