import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'gharwa_auth',
  port: parseInt(process.env.DB_PORT || '3306'),
};

export async function PUT(request: NextRequest) {
  try {
    const { filename, name, alt } = await request.json();

    if (!filename || !name || !alt) {
      return NextResponse.json(
        { error: 'Filename, name, and alt text are required' },
        { status: 400 }
      );
    }

    const connection = await mysql.createConnection(dbConfig);
    
    // Update the image metadata in the database
    await connection.execute(
      'UPDATE gallery_images SET name = ?, alt_text = ?, updated_at = NOW() WHERE filename = ?',
      [name, alt, filename]
    );
    
    await connection.end();
    
    console.log(`Updated metadata for gallery image: ${filename}`);
    
    return NextResponse.json(
      { 
        message: 'Image metadata updated successfully',
        filename,
        name,
        alt
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating image metadata:', error);
    return NextResponse.json(
      { error: 'Failed to update image metadata' },
      { status: 500 }
    );
  }
}
