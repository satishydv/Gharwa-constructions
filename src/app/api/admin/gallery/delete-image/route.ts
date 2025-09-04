import { NextRequest, NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import { join } from 'path';

export async function DELETE(request: NextRequest) {
  try {
    const formData = await request.formData();
    const filename = formData.get('filename') as string;

    if (!filename) {
      return NextResponse.json(
        { error: 'Filename is required' },
        { status: 400 }
      );
    }

    // Construct the full path to the image file
    const imagePath = join(process.cwd(), 'public', 'Gallery', filename);

    // Check if file exists and delete it
    try {
      await unlink(imagePath);
      console.log(`Image deleted successfully: ${imagePath}`);
      
      return NextResponse.json(
        { message: 'Image deleted successfully', filename },
        { status: 200 }
      );
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        // File doesn't exist
        console.log(`Image file not found: ${imagePath}`);
        return NextResponse.json(
          { message: 'Image file not found', filename },
          { status: 404 }
        );
      }
      throw error;
    }

  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}
