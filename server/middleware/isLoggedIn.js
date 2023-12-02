import express from 'express';
import session from 'express-session';

const app = express();

app.use(session({
    secret: 'your-key',
    resave: false,
    saveUninitialized:true,
}));



export const  isLoggedIn = (req,res,next) => {
    if(!req.session.userId) {
        return res.status(401).json({message:"Unauthorized. Please login  again."});
    }
    next();
}

