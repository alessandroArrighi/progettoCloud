import { Router } from "express"
import * as ordersController from "../controllers/orders-controller"

const router: Router = Router()

router.post("/api/ordini/idordine", ordersController.ordersFromID)
router.post("/api/ordini/crea/ordine", ordersController.createOrder)
router.get("/api/ordini/user", ordersController.ordersFromUser)
router.post("/api/ordini/getordine", ordersController.getOrder)

export default router