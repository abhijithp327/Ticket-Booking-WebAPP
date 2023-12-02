import Ticket from "../models/TicketModel.js";




export const addToCart = async(req,res) => {
  try {
    const { ticketId } = req.params;
    const { quantity } = req.body;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    if (ticket.availableQuantity < quantity) {
      return res.status(400).json({ error: 'Not enough stock available' });
    }

    req.session.cart = req.session.cart || {};
    req.session.cart[ticketId] = (req.session.cart[ticketId] || 0) + quantity;

    res.json({ success: true, messsage:"Ticket added to cart successfully" });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



export const getCartItems = async(req,res) => {
    try {
        const cart = req.session.cart || {};
        const cartItems = [];
        console.log(cartItems);

    
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
