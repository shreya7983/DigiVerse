import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/digiverse';
  
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500,
    });
    isConnected = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[Database] Notice: MongoDB not reachable (${error.message}).`);
    console.log('[Database] Falling back to zero-config resilient local persistence for profiles.');
    isConnected = false;
  }
};

export const isDbConnected = () => isConnected;
