import supabase from '@/lib/supabase';

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const committeeID = url.searchParams.get('committeeID');
        if (!committeeID) {
            return new Response(JSON.stringify({ message: 'Missing committeeID parameter' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const { data: delegationData, error: delegationError } = await supabase
            .from('Delegation')
            .select('countryID')
            .eq('committeeID', committeeID);
        if (delegationError) {
            return new Response(JSON.stringify({ message: `Error fetching delegations: ${delegationError.message}` }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const countryIDs = (delegationData || []).map((row: {countryID : string}) => row.countryID);
        if (countryIDs.length === 0) {
            return new Response(JSON.stringify([]), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const { data, error } = await supabase
            .from('Country')
            .select('*')
            .in('countryID', countryIDs);
        if (error) {
            return new Response(JSON.stringify({ message: `Error fetching countries: ${error.message}` }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch {
        return new Response(JSON.stringify({ message: 'Error fetching countries' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}