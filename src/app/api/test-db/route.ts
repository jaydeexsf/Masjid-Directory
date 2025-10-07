import { NextResponse } from 'next/server';
import { connectDBSafe } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await connectDBSafe();
    
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Failed to connect to MongoDB' },
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
    });
    
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Database connection test failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
