import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRouter from './routers/authRouter.js';
import userRouter from './routers/userRouter.js';
import taskRouter from './routers/taskRouter.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

const app = express();

app.use( cors( { credentials: true, origin: process.env.FRONT_URI } ) );
app.use( cookieParser() );
app.use( express.json() );
app.use( '/auth', authRouter );
app.use( '/user', userRouter );
app.use( '/task', taskRouter );
app.use( errorMiddleware );

mongoose.connect( process.env.MONGODB_URI );

app.listen( process.env.PORT, () => console.log( `Server is running on port ${process.env.PORT}` ) );