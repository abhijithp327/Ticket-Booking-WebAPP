import  mongoose  from "mongoose";



const orderSchema = new mongoose.Schema({
    items: [
      {
        ticketId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Ticket',
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
  });


  
export default mongoose.model('Order', orderSchema)