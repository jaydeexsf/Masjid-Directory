import { NextResponse } from 'next/server';
import { connectDBSafe } from '@/lib/mongodb';
import mongoose from 'mongoose';

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

export async function GET() {
  try {
    const db = await connectDBSafe();
    
    if (!db) {
      const mongoUri = process.env.MONGODB_URI;
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to connect to MongoDB',
          diagnostics: {
            maskedUri: maskConnectionString(mongoUri),
            uriKind: mongoUri?.startsWith('mongodb+srv://') ? 'srv' : mongoUri?.startsWith('mongodb://') ? 'standard' : 'unknown',
            mongooseReadyState: mongoose.connection.readyState,
            mongooseVersion: mongoose.version,
            nodeVersion: process.version,
          },
          env: {
            hasMongoUri: !!mongoUri,
            nodeEnv: process.env.NODE_ENV,
            vercelEnv: process.env.VERCEL_ENV,
            region: process.env.VERCEL_REGION,
          },
          hint:
            'Verify MONGODB_URI on Vercel and Atlas Network Access (allow Vercel integration or 0.0.0.0/0 to test). Ensure your URI uses mongodb+srv and correct username/password.'
        },
        { status: 500 }
      );
    }

    // Test the connection by pinging the database
    await db.connection.db?.admin().ping();
    
    return NextResponse.json({
      success: true,
      message: 'Successfully connected to MongoDB!',
      dbName: db.connection.name,
      dbHost: db.connection.host,
      dbPort: db.connection.port,
      mongooseReadyState: mongoose.connection.readyState,
      mongooseVersion: mongoose.version,
      env: {
        nodeEnv: process.env.NODE_ENV,
        vercelEnv: process.env.VERCEL_ENV,
        region: process.env.VERCEL_REGION,
      }
    });
    
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Database connection test failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        mongooseReadyState: mongoose.connection.readyState,
        mongooseVersion: mongoose.version,
        env: {
          hasMongoUri: !!process.env.MONGODB_URI,
          nodeEnv: process.env.NODE_ENV,
          vercelEnv: process.env.VERCEL_ENV,
          region: process.env.VERCEL_REGION,
        }
      },
      { status: 500 }
    );
  }
}
