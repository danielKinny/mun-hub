import { NextResponse } from "next/server";
import { Speech, Delegate } from "@/db/types";
import supabase from "@/lib/supabase";

export async function DELETE(request: Request) {
  try {
    const { speechID } = await request.json();
    if (!speechID) {
      return new NextResponse(JSON.stringify({ message: "Missing speechID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { error } = await supabase
      .from("Speech")
      .delete()
      .eq("speechID", speechID);

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
    const body = await request.json();
    const speechData: Speech = body.speechData;
    const delegateID: string = body.delegateID;

    if (!speechData.title || !speechData.content) {
      return new NextResponse(
        JSON.stringify({
          message:
            "Missing required speech fields: title and content are required",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const { data: existingSpeech, error: existingError } = (await supabase
      .from("Speech")
      .select()
      .eq("speechID", speechData.speechID)
      .single()) as { data: Speech | null; error: Error | null };

    if (existingSpeech) {
      const { data: updatedData, error: updatedError } = await supabase
        .from("Speech")
        .update({ title: speechData.title, content: speechData.content })
        .eq("speechID", speechData.speechID)
        .select()
        .single();

      if (updatedError) {
        console.error("Error updating speech:", updatedError);
        return new NextResponse(
          JSON.stringify({
            message: `Error updating speech: ${updatedError.message}`,
          }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }

      return new NextResponse(
        JSON.stringify({
          response: "Speech updated successfully",
          speech: updatedData,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      const { data: insertedData, error: insertedError } = await supabase
        .from("Speech")
        .insert(speechData)
        .select()
        .single();

      if (insertedError) {
        console.error("Error inserting speech:", insertedError);
        return new NextResponse(
          JSON.stringify({
            message: `Error inserting speech: ${insertedError.message}`,
          }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }

      if (!insertedData) {
        return new NextResponse(
          JSON.stringify({
            message: "Failed to insert speech: No data returned",
          }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }

      const { error: relationshipError } = await supabase
        .from("Delegate-Speech")
        .insert({
          delegateID: delegateID,
          speechID: insertedData.speechID,
        });

      if (relationshipError) {
        console.error(
          "Error creating delegate-speech relationship:",
          relationshipError
        );
        return new NextResponse(
          JSON.stringify({
            response:
              "Speech added successfully, but failed to create relationship",
            speech: insertedData,
          }),
          { status: 201, headers: { "Content-Type": "application/json" } }
        );
      }

      const { error: incrementError } = await supabase.rpc(
        "increment_speech_count",
        { delegate_id: delegateID }
      );

      if (incrementError) {
        console.error("Error incrementing speech count:", incrementError);
      }

      return new NextResponse(
        JSON.stringify({
          response: "Speech added successfully",
          speech: insertedData,
        }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
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

    let query = supabase.from("Speech").select(`
    *,
    Delegate-Speech(delegateID)
    `);

    if (delegateID) {
      query = query.eq("Delegate-Speech.delegateID", delegateID);
    }

    const { data, error } = await query;
    if (error) {
      return new NextResponse(
        JSON.stringify({
          message: `Error fetching speeches: ${error.message}`,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new NextResponse(JSON.stringify({ speeches: data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return new NextResponse(
      JSON.stringify({ message: `Error fetching speeches: ${errorMessage}` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
