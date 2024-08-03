import { Router } from 'express'; 
import adminController from '../controllers/admin.controller.js';


const router = Router()

router.route("/login").post(adminController.admin_login)

export default  router;
