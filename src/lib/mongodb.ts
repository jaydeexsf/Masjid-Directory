import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/masjid-directory';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDBSafe(): Promise<typeof mongoose | null> {
  if (cached!.conn) return cached!.conn;

  if (!cached!.promise) {
    const opts: Parameters<typeof mongoose.connect>[1] = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000,
    } as any;

    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((m) => m);
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (error) {
    cached!.promise = null;
    return null;
  }

  return cached!.conn;
}

export default async function connectDB(): Promise<typeof mongoose> {
  const conn = await connectDBSafe();
  if (!conn) {
    throw new Error('Database connection failed');
  }
  return conn;
}
