 import { Router } from 'express';
 import healthcheck from '../controllers/healthCheck.js';
 import {apiTest} from '../controllers/healthCheck.js';

 const router = Router()

router.route("/").get(healthcheck)
router.route("/apitest").get(apiTest)


export default router