import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    const filename = formData.get('filename') as string;

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
