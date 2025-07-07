import { NextRequest, NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/supabaseAdmin';

export async function POST(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      console.error('Supabase admin client not initialized - missing environment variables');
      return NextResponse.json(
        { error: 'Server configuration error - missing Supabase credentials' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const timestamp = new Date().getTime();
    const fileExtension = file.name.split('.').pop();
    const safeFileName = `update_${timestamp}.${fileExtension}`;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const { error: uploadError } = await supabaseAdmin
      .storage
      .from('live-updates')
      .upload(`update-images/${safeFileName}`, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: true 
      });
      
    if (uploadError) {
      console.error('Error uploading file to Supabase:', uploadError);
      console.error('File details:', {
        name: file.name,
        type: file.type,
        size: file.size,
        path: `update-images/${safeFileName}`,
        errorMessage: uploadError.message
      });
      return NextResponse.json(
        { error: 'Error uploading file', details: uploadError.message },
        { status: 500 }
      );
    }
    
    const { data: urlData } = supabaseAdmin
      .storage
      .from('live-updates')
      .getPublicUrl(`update-images/${safeFileName}`);
      
    const imageUrl = urlData.publicUrl;
    const { data: dbData, error: dbError } = await supabaseAdmin
      .from('Updates')
      .insert({
        updateID: `update_${timestamp}`,
        title: title,
        content: content,
        time: new Date().toISOString(),
        href: imageUrl,
      })
      .select();
      
    if (dbError) {
      console.error('Error inserting record:', dbError);
      return NextResponse.json(
        { error: 'Error creating update record', details: dbError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: 'Update created successfully',
      update: dbData[0]
    });
  } catch (error) {
    console.error('Error in upload-image API route:', error);
    if (error instanceof Error && error.stack) {
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json(
      { error: 'Error processing upload request', details: (error as Error).message },
      { status: 500 }
    );
  }
}
