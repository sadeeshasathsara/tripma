// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ApiRoutes from './src/routes/ApiRoutes.js'
import AuthRoutes from './src/routes/AuthRoutes.js'
import ApiTesting from './src/api/test/apiTesting.js';
import mongoose from 'mongoose';
import ErrorHandler from './src/middlewares/error_handler.middleware.js';
import cookieParser from 'cookie-parser';

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

//API Router
app.get('/', ApiTesting);
app.use('/api', ApiRoutes);
app.use('/api/auth', AuthRoutes)

//Error handler route
app.use(ErrorHandler)

app.use('/uploads/profile_pictures', express.static('./src/uploads/profile_pictures'));


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");


        // Start server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    })
    .catch((e) => {
        console.log(`MongoDB connect error ${e.message}`);
    }) 