import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false; // Bağlantı durumunu takip etmek için

export const connectDB = async () => {
  if (isConnected) {
    console.log('MongoDB zaten bağlı');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB as string);
    isConnected = true;
    console.log('MongoDB bağlantısı başarılı');
  } catch (error) {
    console.error('MongoDB bağlantı hatası:', error);
  }
};
