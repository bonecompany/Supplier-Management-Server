import { Router } from 'express';
import adminController from '../controllers/admin.controller.js';

const router = Router()

router.post("/login", adminController.admin_login);
router.get("/suppliers", adminController.supplier_listing);
router.get("/supplier/:id", adminController.supplier_find);
router.post("/supplier/latex", adminController.daily_latex_add);
router.get("/supplier/profile/:id", adminController.supplier_find);
router.put("/supplier/update/:id", adminController.upadteSupplierProfile);
router.delete("/supplier/delete/:id", adminController.deleteSupplier);
router.get("/tappers", adminController.tappersFind);
router.get("/tappers/:id", adminController.tapperFind);


export default router;
