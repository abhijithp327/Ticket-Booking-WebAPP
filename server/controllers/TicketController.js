import Ticket from "../models/TicketModel.js";
import { uuid } from 'uuidv4';
import session from 'express-session';
import { parse } from "uuid";


export const createTicket = async(req,res) => {
    try {
        const { name, price, availableQuantity } = req.body;
        const id = uuid();
        const newTicket = new Ticket({ id, name, price, availableQuantity });
        await newTicket.save();
         res.status(200).json({message:"Ticket Purchased Successfully"});

    } catch (error) {

         res.status(500).json({message:"Internal Server Error"});
    }
};




export const getAllTickets = async(req,res) => {
    try {
        const tickets = await Ticket.find({});
        res.json(tickets)
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
    }
};



export const addQuantity = async(req,res) => {
    try {
        const { ticketId, quantity } = req.params;
        const ticket = await Ticket.findOne({ id: ticketId });

        if(!ticket) {
           return res.status(404).json({message:"Ticket not found"});
        }

        if(quantity > ticket.availableQuantity) {
            return res.status(400).json({message:"Request Quantity Exceeds available stock"});
        }

       req.session.cart = req.session.cart || [];
       const cartItem = req.session.cart.find(item => item.id === ticketId );

       if(cartItem) {
        cartItem.quantity += parseInt(quantity);
       } else {
        res.session.cart.push({
            id: ticket.id,
            name: ticket.name,
            price: ticket.price,
            quantity: parseInt(quantity),
        });
       }

       res.status(200).json({message:"Ticket Added To Cart Successfully"});
       

    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
    }
}



export const getCartItems = async(req,res) => {
    const cart = req.session.cart || [];
    res.json(cart);
};


export const removeTicketFromCart = async(req,res) => {
    const { ticketId } = req.params;
    req.session.cart = req.session.cart.filter(item => item.id !== ticketId );
    res.status(200).json({message:"Ticket Removed From Cart Successfully"});

}




export const cartTotalPrice = async(req,res) => {
    const cart = req.session.cart || [];
    const totalPrice = cart.reduce((acc, item ) => acc + item.price * item.quantity, 0);
    res.json({total : totalPrice});
};



export const checkOut = async(req,res) => {
    const cart = req.session.cart || [];
    res.json(cart);
};






