import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

function maskConnectionString(uri?: string): string {
  if (!uri) return 'undefined';
  try {
    const url = new URL(uri);
    const maskedAuth = url.username ? `${url.username}:********` : 'no-auth';
    return `${url.protocol}//${maskedAuth}@${url.host}${url.pathname}`;
  } catch {
    return 'invalid-connection-string';
  }
}

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
    console.error('[DB] MONGODB_URI environment variable is not defined', {
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV,
      region: process.env.VERCEL_REGION,
    });
    return null;
  }

  if (cached.conn) {
    // Connected previously in this lambda/process
    console.log('[DB] Reusing existing mongoose connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      // make failures surface faster and clearer in serverless
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 20000,
    } as any;

    console.log('[DB] Attempting to connect to MongoDB', {
      uri: maskConnectionString(MONGODB_URI),
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV,
      region: process.env.VERCEL_REGION,
    });

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log('[DB] MongoDB connected', {
          dbName: mongooseInstance.connection.name,
          host: mongooseInstance.connection.host,
          port: mongooseInstance.connection.port,
        });
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('[DB] MongoDB connection error', {
      message: e instanceof Error ? e.message : String(e),
      name: (e as any)?.name,
      code: (e as any)?.code,
      reason: (e as any)?.reason,
      uri: maskConnectionString(MONGODB_URI),
      hint:
        'If on Vercel/Atlas: ensure Atlas Network Access allows your deployment (use Vercel integration or 0.0.0.0/0 for testing).',
    });
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
