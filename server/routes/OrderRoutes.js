import express from 'express';
import { checkOut } from '../controllers/OrderController.js';



const router = express.Router();

router.post('/checkout', checkOut);


export default router;