import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export async function connectDBSafe(): Promise<typeof mongoose | null> {
  // Check if MongoDB URI is available
  if (!MONGODB_URI) {
    console.error('MONGODB_URI environment variable is not defined');
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('MongoDB connection error:', e);
    return null;
  }

  return cached.conn;
}

export default async function connectDB(): Promise<typeof mongoose> {
  try {
    const conn = await connectDBSafe();
    if (!conn) {
      console.error('Failed to establish MongoDB connection');
      throw new Error('Database connection failed. Please check your connection string and network.');
    }
    return conn;
  } catch (error) {
    console.error('Error in connectDB:', error);
    throw error;
  }
}
