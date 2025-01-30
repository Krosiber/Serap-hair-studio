import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./config/mongoose"
import apiRoutes from "./routes/route"

dotenv.config()

const app = express()

// Middleware
app.use(cors({
  origin: 'https://serap-hair-studio.vercel.app/',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json())

// Routes
app.use('/api', apiRoutes)
app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
}, express.static('public/uploads'));

// MongoDB bağlantısı
connectDB()

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

