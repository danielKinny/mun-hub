import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const committeeID = searchParams.get('committeeID');

    const { data, error } = await supabase
        .from('Resos')
        .select('*')
        .eq('committeeID', committeeID);

    if (error) {
        console.error('Error fetching resolutions:', error);
        return NextResponse.json({ error: 'Failed to fetch resolutions' }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
}