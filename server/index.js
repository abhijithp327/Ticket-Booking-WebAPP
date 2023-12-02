import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import ticketRoutes from './routes/TicketRoutes.js';
import cartRoutes from './routes/CartRoutes.js';



const app = express();
const port = 4000;

const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://abhijithp327:12345@cluster0.p9jrfto.mongodb.net/');
        console.log("Mongodb Database Connected");
    } catch (err) {
        console.log("Database Connection Failed");
    }
}

app.get('/', (req,res) => {
    res.json("ticket booking server online")
});

app.use(session({
    secret: 'my-key',
    resave: false,
    saveUninitialized:true,
}));



app.use(express.json());
app.use(cors({
    origin:true
}));

app.use('/ticket', ticketRoutes);
app.use('/cart', cartRoutes);






app.listen(port, () => {
    connect();
    console.log("server running successfully on port", port);
})