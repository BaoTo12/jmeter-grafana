
import express from "express"
import authRouter from "./auth/index.js"
import cartRouter from "./cart/index.js"
import checkoutRouter from "./checkout/index.js"
import productRouter from "./product/index.js"
import { authenticate } from "../controllers/auth.controller.js"



const router = express.Router();

// const BASE_URL = process.env.API_VERSION + "/api"

router.use(`/v1/api/auth`, authRouter)

router.use(authenticate)

router.use(`/v1/api/cart`, cartRouter)
router.use(`/v1/api/checkout`, checkoutRouter)
router.use(`/v1/api/product`, productRouter)

export default router