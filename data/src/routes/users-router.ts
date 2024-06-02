import { Router } from "express"
import * as usersController from "../controllers/users-controller"

const router: Router = Router()

router.get("/api/utenze", usersController.getUsersFromID)
router.post("/api/utenze/modifica", usersController.modifyUser)

export default router