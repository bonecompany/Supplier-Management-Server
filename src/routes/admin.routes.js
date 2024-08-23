import { Router } from 'express';
import adminController from '../controllers/admin.controller.js';

const router = Router()

<<<<<<< HEAD
router.post("/login", adminController.admin_login);
router.get("/suppliers", adminController.supplier_listing);
=======
router.post("/register", adminController.admin_creating)
router.post("/login", adminController.admin_login)
>>>>>>> f5c1cdf8aec4f61595595905d8153bc680539c3c


export default router;
