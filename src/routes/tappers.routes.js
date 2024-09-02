// tappersroutes
import { Router } from "express";
import tappers from "../controllers/tappers.controller.js"


 const router = Router()

router.post("/register", tappers.register);

export default router