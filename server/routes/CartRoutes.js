import express from 'express';
import { addToCart, cartTotalPrice, getCartItems, removeTicketFromCart } from '../controllers/CartController.js';


const router = express.Router();


router.post('/addtocart/:ticketId', addToCart);
router.get('/viewcart', getCartItems);
router.delete('/deletecart/:ticketId', removeTicketFromCart);
router.get('/total', cartTotalPrice);


export default router;