import * as data from "../controllers/data-controller.js"
import { Router } from "express"

const router = Router()

router.use("/api/ordini/idordine", data.ordersFromID)
router.use("/api/ordini/crea/ordine", data.createOrder)
router.use("/api/ordini/user", data.ordersFromUser)
router.use("/api/ordini/getordine", data.getOrder)

router.use("/api/prodotti/vista", data.allFramesGrad)
router.use("/api/prodotti/sole", data.allFramesSun)
router.use("/api/prodotti/lac", data.allLac)
router.use("/api/prodotti/vista/:id", data.getFrameFromID)
router.use("/api/prodotti/lac/:id", data.getLacFromID)
router.use("/api/prodotti/lenti/:id", data.getLensesFromID)
router.use("/api/prodotti/aggiungi/montature", data.addNewFrame)
router.use("/api/prodotti/aggiungi/lac", data.addNewLAC)
router.use("/api/prodotti/modifica/montature", data.modifyFrame)
router.use("/api/prodotti/modifica/lac", data.modifyLAC)
router.use("/api/prodotti/elimina", data.deleteProduct)

router.use("/api/utenze", data.getUsersFromID)
router.use("/api/utenze/modifica", data.modifyUser)

export default router