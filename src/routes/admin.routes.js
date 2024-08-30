import { Router } from 'express';
import adminController from '../controllers/admin.controller.js';

const router = Router()

router.post("/login", adminController.admin_login);
router.get("/suppliers", adminController.supplier_listing);
router.get("/supplier/:id", adminController.supplier_find);
router.post("/supplier/latex", adminController.daily_latex_add);


export default router;
