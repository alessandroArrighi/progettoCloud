import { Router } from "express"
import * as productsController from "../controllers/products-controller"

const router: Router = Router()

router.get("/api/prodotti/vista", productsController.allFramesGrad)
router.get("/api/prodotti/sole", productsController.allFramesSun)
router.get("/api/prodotti/lac", productsController.allLac)
router.get("/api/prodotti/vista/:id", productsController.getFrameFromID)
router.get("/api/prodotti/lac/:id", productsController.getLacFromID)
router.get("/api/prodotti/lenti/:id", productsController.getLensesFromID)
router.post("/api/prodotti/aggiungi/montature", productsController.addNewFrame)
router.post("/api/prodotti/aggiungi/lac", productsController.addNewLAC)
router.post("/api/prodotti/modifica/montature", productsController.modifyFrame)
router.post("/api/prodotti/modifica/lac", productsController.modifyLAC)
router.post("/api/prodotti/elimina", productsController.deleteProduct)

export default router