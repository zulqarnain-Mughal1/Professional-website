import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from '../src/routes/user.router.js';

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials:true,
}))
app.use(express.json({limit: '16kb'}));
app.use(urlencoded({extended:true, limit: '16kb'}))
app.use(express.static('public'));
app.use(cookieParser())


app.use("/api/v1/users", userRouter)



export {app}