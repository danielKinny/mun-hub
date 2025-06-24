import supabase from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const { data: updateData, error: updateError } = await supabase 
            .from('Updates')
            .select('*')
            .order('time', { ascending: false });
            
        if (updateError) {
            console.error("Error fetching updates:", updateError);
            return NextResponse.json({ error: updateError.message }, { status: 500 });
        }
        
        const updatesWithValidUrls = updateData?.map(update => {
            if (update.href && (update.href.startsWith('http://') || update.href.startsWith('https://'))) {
                return update;
            }
            return update;
        });
        
        return NextResponse.json(updatesWithValidUrls || [], { status: 200 });
    } catch (error) {
        console.error("Unexpected error in updates API:", error);
        return NextResponse.json({ error: "Failed to fetch updates" }, { status: 500 });
    }
}