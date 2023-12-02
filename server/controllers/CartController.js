import Ticket from "../models/TicketModel.js";




export const addToCart = async(req,res) => {
    try {
        const { ticketId } = req.params;
        const { quantity } = req.body;

        const ticket = await Ticket.findById( ticketId );

        if(!ticket) {
           return res.status(404).json({message:"Ticket not found"});
        }

        if( ticket.availableQuantity < quantity ) {
            return res.status(400).json({message:"Request Quantity Exceeds available stock"});
        }

       req.session.cart = req.session.cart || [];
       req.session.cart[ticketId] = (req.session.cart[ticketId] || 0 ) + quantity;


       res.status(200).json({message:"Ticket Added To Cart Successfully"});
       

    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
    }
}



export const getCartItems = async(req,res) => {
    try {
        const cart = req.session.cart || {};
        const cartItems = [];
    
        for (const ticketId in cart) {
          const ticket = await Ticket.findById(ticketId);
          if (ticket) {
            const quantity = cart[ticketId];
            const totalPrice = quantity * ticket.price;
            cartItems.push({
              ticketId: ticket._id,
              name: ticket.name,
              price: ticket.price,
              quantity,
              totalPrice,
            });
          }
        }
    
        res.json(cartItems);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };



export const removeTicketFromCart = async(req,res) => {
    const { ticketId } = req.params;
  req.session.cart = req.session.cart || {};

  if (req.session.cart[ticketId]) {
    delete req.session.cart[ticketId];
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Item not found in the cart' });
  }

};




export const cartTotalPrice = async(req,res) => {
    try {
    const cart = req.session.cart || {};
    let totalPrice = 0;

    for (const ticketId in cart) {
      const ticket = await Ticket.findById(ticketId);
      if (ticket) {
        const quantity = cart[ticketId];
        totalPrice += quantity * ticket.price;
      }
    }

    res.json({ totalPrice });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
