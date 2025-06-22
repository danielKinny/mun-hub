import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import * as path from 'path';

//needs a refactor imo
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const filename = formData.get('filename') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    const safeFilename = filename.replace(/[^\w.-]/g, '_');
    
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'updates');
    
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      console.error('Error creating directory:', error);
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = join(uploadDir, safeFilename);
    await writeFile(filePath, buffer);

    return NextResponse.json({ 
      success: true,
      message: 'File uploaded successfully',
      path: `/images/updates/${safeFilename}` 
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Error uploading file', details: (error as Error).message },
      { status: 500 }
    );
  }
}
