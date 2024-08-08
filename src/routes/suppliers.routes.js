import { Router } from "express";
import {supplier}  from "../controllers/suppliers.controller.js";

const router = Router();

router.post("/reg", supplier.registration);

export default router;
