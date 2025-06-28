import supabase from '@/lib/supabase';
import { NextResponse } from 'next/server';



export async function GET(url: Request) {

    const { searchParams } = new URL(url.url);
    const author = searchParams.get('delegateID');

    const { data, error } = await supabase
        .from('Resos')
        .select('*')
        .eq('delegateID', author);


    if (error) {
        console.error('Error fetching resolutions:', error);
        return NextResponse.json({ error: 'Failed to fetch resolutions' }, { status: 500 });
    }
    if (!data || data.length === 0) {
        return NextResponse.json(data, { status: 200 });
    }
    return NextResponse.json(data, { status: 200 });
    

}

export async function POST(request: Request) {
    const { resoID, delegateID, committeeID, content, title } = await request.json();

    const {data : userPerms, error: userPermsError} = await supabase
        .from('Delegate')
        .select('resoPerms')
        .eq('delegateID', delegateID)
        .single();
    if (userPermsError) {
        console.error('Error fetching user permissions:', userPermsError);
        return NextResponse.json({ error: 'Failed to fetch user permissions' }, { status: 500 });
    }

    if (resoID !== "-1"){
        if ( !(userPerms.resoPerms["update:reso"].includes(resoID)) && !(userPerms.resoPerms["update:ownreso"])){
            return NextResponse.json({ error: 'You do not have permission to update this resolution' }, { status: 403 });
        }
        const { error } = await supabase
            .from('Resos')
            .update({content, title})
            .eq('resoID', resoID)
        if (error) {
            console.error('Error updating resolution:', error);
            return NextResponse.json({ error: 'Failed to update resolution' }, { status: 500 });
        }
        return NextResponse.json({ message: 'Resolution updated successfully' }, { status: 200 });
    }

    if ( !(userPerms.resoPerms["update:ownreso"]) ){
        return NextResponse.json({ error: 'You do not have permission to create your own resolution' }, { status: 403 });
    }

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

    const highestResoID = existingResos.length > 0 ? (parseInt(existingResos[existingResos.length-1].resoID)+1).toString().padStart(4,'0') : '0001';

    const newReso = {
        resoID: highestResoID,
        delegateID,
        committeeID,
        content,
        title
    }

    const { error } = await supabase.
    from('Resos')
    .insert(newReso); // insert the reso, lets hope it work
    if (error) {
        console.error('Error inserting resolution:', error);
        return NextResponse.json({ error: 'Failed to insert resolution' }, { status: 500 });
    }
    return NextResponse.json(newReso, { status: 201 })
    ;
}