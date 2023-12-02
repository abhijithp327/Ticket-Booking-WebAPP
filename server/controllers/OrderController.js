import QRCode from 'qrcode';
import Ticket from '../models/TicketModel.js';
import Order from '../models/OrderModels.js';





export const checkOut = async (req, res) => {
    try {
        const cart = req.session.cart || {};

        let totalAmount = 0;
        const orderItems = [];

        for (const ticketId in cart) {
            const ticket = await Ticket.findById(ticketId);
            if (ticket) {
                const quantity = cart[ticketId];
                totalAmount += quantity * ticket.price;

                orderItems.push({
                    ticketId,
                    quantity,
                });
            }
        }


        const order = new Order({
            items: orderItems,
            totalAmount,
        });

        await order.save();

        // qr code
        const qrData = JSON.stringify({ orderId: order._id.toString(), totalAmount });
        const qrCodePath = `order_${order._id.toString()}.png`;

        await QRCode.toFile(qrCodePath, qrData);


        req.session.cart = {};

        res.json({ success: true, orderId: order._id.toString(), qrCodePath });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}