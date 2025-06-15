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

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        
        if (body.delegateID && body.resoPerms) {
            const { delegateID, resoPerms } = body;
            
            if (typeof resoPerms !== 'object' || 
                !('view:ownreso' in resoPerms) || 
                !('view:allreso' in resoPerms) || 
                !('update:ownreso' in resoPerms)) {
                return new Response(JSON.stringify({ 
                    error: 'Invalid resoPerms structure. Required properties: view:ownreso, view:allreso, update:ownreso'
                }), { status: 400 });
            }
            
            const { data, error } = await supabase
                .from('Delegate')
                .update({ resoPerms })
                .eq('delegateID', delegateID)
                .select();
                
            if (error) {
                console.error('Error updating delegate permissions:', error);
                return new Response(JSON.stringify({ error: 'Failed to update delegate permissions' }), { status: 500 });
            }
            
            if (!data || data.length === 0) {
                return new Response(JSON.stringify({ message: 'Delegate not found' }), { status: 404 });
            }
            
            return new Response(JSON.stringify({ 
                message: 'Delegate permissions updated successfully',
                delegate: data[0]
            }), { status: 200 });
        } 
        else if (body.delegates && Array.isArray(body.delegates)) {
            const { delegates } = body;
            
            if (delegates.length === 0) {
                return new Response(JSON.stringify({ error: 'No delegates provided' }), { status: 400 });
            }
            
            const updates = [];
            const errors = [];
            
            for (const delegate of delegates) {
                const { delegateID, resoPerms } = delegate;
                
                if (!delegateID || !resoPerms) {
                    errors.push({ delegateID, error: 'Missing delegateID or resoPerms' });
                    continue;
                }
                
                if (typeof resoPerms !== 'object' || 
                    !('view:ownreso' in resoPerms) || 
                    !('view:allreso' in resoPerms) || 
                    !('update:ownreso' in resoPerms)) {
                    errors.push({ 
                        delegateID, 
                        error: 'Invalid resoPerms structure'
                    });
                    continue;
                }
                
                updates.push({ delegateID, resoPerms });
            }
            
            if (errors.length > 0) {
                return new Response(JSON.stringify({ 
                    error: 'Invalid data for some delegates', 
                    details: errors 
                }), { status: 400 });
            }
            const results = [];
            
            for (const update of updates) {
                const { delegateID, resoPerms } = update;
                
                const { data, error } = await supabase
                    .from('Delegate')
                    .update({ resoPerms })
                    .eq('delegateID', delegateID)
                    .select();
                
                if (error) {
                    results.push({ 
                        delegateID, 
                        success: false, 
                        error: error.message 
                    });
                } else if (!data || data.length === 0) {
                    results.push({ 
                        delegateID, 
                        success: false, 
                        error: 'Delegate not found' 
                    });
                } else {
                    results.push({ 
                        delegateID, 
                        success: true, 
                        delegate: data[0] 
                    });
                }
            }
            
            return new Response(JSON.stringify({
                message: 'Bulk update completed',
                results
            }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ 
                error: 'Invalid request format. Provide either a single delegateID and resoPerms, or an array of delegates'
            }), { status: 400 });
        }
    } catch (error) {
        console.error('Error processing PUT request:', error);
        return new Response(JSON.stringify({ error: 'Failed to process request' }), { status: 500 });
    }
}
