import supabase from "@/lib/supabase";


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const committeeID = searchParams.get('committeeID');

    const { data : delegateIDs, error : IDerror} = await supabase
        .from('Delegation')
        .select('delegateID')
        .eq('committeeID', committeeID);

    if (IDerror) {
        console.error('Error fetching delegate:', IDerror);
        return new Response(JSON.stringify({ error: 'Failed to fetch delegate' }), { status: 500 });
    }

    if (!delegateIDs || delegateIDs.length === 0) {
        return new Response(JSON.stringify({ message: 'Delegate not found' }), { status: 404 });
    }

    const {data, error} = await supabase
    .from("Delegate")
    .select("*")
    .in("delegateID", delegateIDs.map((d: { delegateID: string }) => d.delegateID));
    if (error) {
        console.error('Error fetching delegates:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch delegates' }), { status: 500 });
    }
    if (!data || data.length === 0) {
        return new Response(JSON.stringify({ message: 'No delegates found' }), { status: 404 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
}