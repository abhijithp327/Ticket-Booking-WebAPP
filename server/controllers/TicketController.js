import Ticket from "../models/TicketModel.js";



export const createTicket = async(req,res) => {
    try {
        const { name, price, availableQuantity } = req.body;
    
        const newTicket = new Ticket({ name, price, availableQuantity });
        await newTicket.save();
         res.status(200).json({message:"Ticket Purchased Successfully", data: newTicket});

    } catch (error) {

         res.status(500).json({message:"Internal Server Error"});
    }
};




export const getAllTickets = async(req,res) => {
    try {
        const tickets = await Ticket.find();
        res.json(tickets)
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
    }
};











