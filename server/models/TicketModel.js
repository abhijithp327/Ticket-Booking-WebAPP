import  mongoose  from "mongoose";

const ticketSchema = new mongoose.Schema (

    {
        name: String,
        price: Number,
        availableQuantity: Number,
    },
);




export default mongoose.model('Tickets', ticketSchema);