import express from 'express';
import { createTicket, getAllTickets } from '../controllers/TicketController.js';

const router = express.Router();


router.post('/create-ticket', createTicket);
router.get('/getall-ticket', getAllTickets);


export default router;