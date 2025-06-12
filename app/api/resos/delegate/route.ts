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

export async function POST(request: Request) {
    const { delegateID, committeeID, content } = await request.json();

    const { data : existingResos, error : resoError } = await supabase
        .from('Resos')
        .select('resoID')

    if (existingResos && existingResos.length > 0) {
    existingResos.sort((a, b) => a.resoID.localeCompare(b.resoID));
} // look into refactoring this

    if (resoError) {
        console.error('Error fetching existing resolutions:', resoError);
        return NextResponse.json({ error: 'Failed to fetch existing resolutions' }, { status: 500 });
    }

    const highestResoID = existingResos.length > 0 ? (parseInt(existingResos[- 1].resoID)+1).toString().padStart(4,'0') : '0001';

    const { data, error } = await supabase.
    from('Resos')
    .insert({
        highestResoID,
        delegateID,
        committeeID,
        content
    }); // insert the reso, lets hop it work
    if (error) {
        console.error('Error inserting resolution:', error);
        return NextResponse.json({ error: 'Failed to insert resolution' }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 })
    ;
}