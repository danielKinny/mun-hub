import supabase from '@/lib/supabase';
import { NextResponse } from 'next/server';



export async function GET(url: Request) {

    const { searchParams } = new URL(url.url);
    const author = searchParams.get('delegateID');

    const { data, error } = await supabase
        .from('Resos')
        .select('content')
        .eq('delegateID', author);


    if (error) {
        console.error('Error fetching resolutions:', error);
        return NextResponse.json({ error: 'Failed to fetch resolutions' }, { status: 500 });
    }
    if (!data || data.length === 0) {
        return NextResponse.json({ message: 'No resolutions found' }, { status: 404 });
    }
    return NextResponse.json(data, { status: 200 });
    

}