
import express from "express"
import authRouter from "./auth/index.js"
import cartRouter from "./cart/index.js"
import checkoutRouter from "./checkout/index.js"
import productRouter from "./product/index.js"



const router = express.Router();

const BASE_URL = process.env.API_VERSION + "api"

router.use(`${BASE_URL}/auth`, authRouter)
router.use(`${BASE_URL}/cart`, cartRouter)
router.use(`${BASE_URL}/checkout`, checkoutRouter)
router.use(`${BASE_URL}/product`, productRouter)

export default router