import supabase from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {

    const { data: updateData, error: updateError } = await supabase 
        .from('Updates')
        .select('*')
        .order('time', { ascending: false });
    if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
    }
    return NextResponse.json(updateData, { status: 200 });
}