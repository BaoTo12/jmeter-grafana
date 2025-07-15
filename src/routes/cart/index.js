import { Router } from 'express';
import { viewCart, addToCart, updateItem, removeItem } from '../../controllers/cart.controller.js';

const router = Router();
router.get('/:userId', viewCart);
router.post('/:userId', addToCart);
router.put('/:userId/:productId', updateItem);
router.delete('/:userId/:productId', removeItem);

export default router;