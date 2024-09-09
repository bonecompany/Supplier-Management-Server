// tappersroutes
import { Router } from "express";
import tappers from "../controllers/tappers.controller.js"


const router = Router()

router.post("/registration", tappers.register);

export default router