import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import orderRoutes from './routes/orderRoutes';
import cookieParser from 'cookie-parser';
import connectToDB from './config/db';


// Load common environment variables
dotenv.config();

// Load environment-specific variables

dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });


const app = express();

// Middleware
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Allows cookies to be sent with requests
}));
app.use(bodyParser.json());

// MongoDB Connection
connectToDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

//Run ther server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


export default app;
