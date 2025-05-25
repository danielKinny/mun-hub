import { NextResponse } from "next/server";
import { Speech, Delegate } from "@/db/types";
import supabase from "@/lib/supabase";

export async function DELETE(request: Request) {
  try {
    const { speechID } = await request.json();
    if (!speechID) {
      return new NextResponse(
        JSON.stringify({ message: "Missing speechID" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { error } = await supabase
      .from('Speech')
      .delete()
      .eq('speechID', speechID);

    if (error) {
      return new NextResponse(
        JSON.stringify({ message: `Error deleting speech: ${error.message}` }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Speech deleted successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch {
    return new NextResponse(
      JSON.stringify({ message: "Error deleting speech" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(request: Request) {
  try {
    const speechData: Speech = await request.json();
    
    if (!speechData.title || !speechData.content) {
      return new NextResponse(
        JSON.stringify({ message: "Missing required speech fields: title and content are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const { data, error } = await supabase
      .from('Speech')
      .upsert(speechData)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return new NextResponse(
        JSON.stringify({ message: `Error saving speech: ${error.message}` }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    if (data?.speechID) {
      try {
        const { data: delegateSpeech, error: delegateError } = await supabase
          .from('Delegate-Speech')
          .select('delegateID')
          .eq('speechID', data.speechID)
          .single();
          
        if (delegateError && !delegateError.message.includes('No rows found')) {
          console.error("Error fetching delegate-speech relationship:", delegateError);
        }
        
        if (delegateSpeech?.delegateID) {
          const { error: incrementError } = await supabase.rpc(
            'increment_speech_count', 
            { delegate_id: delegateSpeech.delegateID }
          );
          
          if (incrementError) {
            console.error("Error incrementing speech count:", incrementError);
          }
        }
      } catch (relationError) {
        console.error("Error handling delegate-speech relationship:", relationError);
      }
    }

    return new NextResponse(
      JSON.stringify({ response: "Speech added successfully", speech: data }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in POST /api/speeches:", errorMessage);
    
    return new NextResponse(
      JSON.stringify({ message: `Error saving speech: ${errorMessage}` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const delegateID = searchParams.get("delegateID");

    let query = supabase
    .from('Speech')
    .select(`
    *,
    Delegate-Speech(delegateID)
    `)

    if (delegateID) {
      query = query.eq('Delegate-Speech.delegateID', delegateID);
    }

    const { data, error } = await query;
    if (error) {
      return new NextResponse(
        JSON.stringify({ message: `Error fetching speeches: ${error.message}` }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
    }

    return new NextResponse(
      JSON.stringify({ speeches: data }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return new NextResponse(
      JSON.stringify({ message: `Error fetching speeches: ${errorMessage}` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
