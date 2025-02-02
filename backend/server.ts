import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./config/mongoose"
import apiRoutes from "./routes/route"
import fs from "fs"

if (fs.existsSync('.env')) {
  dotenv.config()
}


const app = express()

// Middleware
app.use(cors({
  origin: 'https://www.seraphairstudio.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json())

// Routes
app.use(apiRoutes)
app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
}, express.static('public/uploads'));

// MongoDB bağlantısı
connectDB()

const PORT:any = process.env.PORT || 3000;
const HOST = process.env.HOST || '::'; 
app.listen(PORT,HOST, () => {
  console.log(`Server running on port ${PORT}`)
})

