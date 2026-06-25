import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware to parse JSON
app.use(express.json());

//env
const port = process.env.PORT || 3000;

// Routes
app.use('/api/auth', authRoutes);

app.use('/', (req, res) => {
    res.send('Hello world');
});

// start server 
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});