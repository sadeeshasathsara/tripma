// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './src/routes/Routes.js'
import ApiTesting from './src/api/test/apiTesting.js';

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

//API Router
app.get('/', ApiTesting);
app.use('/api', router);


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
