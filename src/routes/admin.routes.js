import { Router } from 'express';
import adminController from '../controllers/admin.controller.js';

const router = Router();

router.post("/login", adminController.admin_login);
router.get("/suppliers", adminController.supplier_listing);


export default router;

