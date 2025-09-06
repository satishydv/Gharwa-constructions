import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import mysql from 'mysql2/promise';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    const filename = formData.get('filename') as string;
    const name = formData.get('name') as string;
    const alt = formData.get('alt') as string;

    if (!image || !filename) {
      return NextResponse.json(
        { error: 'Image file and filename are required' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!image.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (image.size > maxSize) {
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      );
    }

    // Get file extension from original filename
    const fileExtension = filename.split('.').pop()?.toLowerCase();
    if (!fileExtension || !['jpg', 'jpeg', 'png', 'webp'].includes(fileExtension)) {
      return NextResponse.json(
        { error: 'Invalid file extension. Only JPG, PNG, and WebP are allowed' },
        { status: 400 }
      );
    }

    // Convert image to buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Construct the full path to save the hero image
    const imagePath = join(process.cwd(), 'public', 'Hero', filename);

    // Write the new hero image file (this will overwrite if it exists)
    await writeFile(imagePath, buffer);

    console.log(`Hero image uploaded successfully: ${imagePath}`);

    // Return the URL for the uploaded hero image
    const imageUrl = `/Hero/${filename}`;

    // Database connection configuration
    const dbConfig = {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'gharwa_auth',
      port: parseInt(process.env.DB_PORT || '3306'),
    };

    // Update database with image information
    try {
      const connection = await mysql.createConnection(dbConfig);
      
      // Check if image already exists in database
      const [existingRows] = await connection.execute(
        'SELECT id FROM hero_images WHERE filename = ?',
        [filename]
      );

      if (Array.isArray(existingRows) && existingRows.length > 0) {
        // Update existing record
        await connection.execute(
          'UPDATE hero_images SET name = ?, alt_text = ?, updated_at = NOW() WHERE filename = ?',
          [name || `Hero Image ${filename}`, alt || name || `Hero image`, filename]
        );
        console.log(`Updated existing hero image record for: ${filename}`);
      } else {
        // Insert new record
        const [result] = await connection.execute(
          'INSERT INTO hero_images (name, filename, alt_text, is_active, display_order, created_at, updated_at) VALUES (?, ?, ?, 1, (SELECT COALESCE(MAX(display_order), 0) + 1 FROM hero_images h2), NOW(), NOW())',
          [name || `Hero Image ${filename}`, filename, alt || name || `Hero image`]
        );
        console.log(`Inserted new hero image record for: ${filename}`);
      }
      
      await connection.end();
    } catch (dbError) {
      console.error('Database update error:', dbError);
      // Don't fail the upload if database update fails
    }

    return NextResponse.json(
      { 
        message: 'Hero image uploaded successfully', 
        filename,
        url: imageUrl,
        size: image.size,
        type: image.type
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error uploading hero image:', error);
    return NextResponse.json(
      { error: 'Failed to upload hero image' },
      { status: 500 }
    );
  }
}
