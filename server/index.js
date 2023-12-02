import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';



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


app.use(express.json());
app.use(cors({
    origin:true
}))





app.listen(port, () => {
    connect();
    console.log("server running successfully on port", port);
})