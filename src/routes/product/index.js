import { Router } from 'express';
import { listProducts, getProduct, createProduct } from '../../controllers/product.controller.js';

const router = Router();
router.get('/', listProducts);
router.post('/', createProduct);
router.get('/:productId', getProduct);

export default router;