import { Router } from 'express';
import { checkout } from '../../controllers/checkout.controller.js';

const router = Router();
router.post('/:userId', checkout);

export default router;
