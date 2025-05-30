import { NextResponse } from "next/server";
import { Speech } from "@/db/types";
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
    const tags: string[] = body.tags;

    if (!speechData.title || !speechData.content) {
      return new NextResponse(
        JSON.stringify({
          message:
            "Missing required speech fields: title and content are required",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // checking if delegate exists by querying db for delegateID
    const { data: existingSpeech} = (await supabase
      .from("Speech")
      .select()
      .eq("speechID", speechData.speechID)
      .single()) as { data: Speech | null; error: Error | null };

    //if there is an existing speech, enter this code block
    if (existingSpeech) {      const { data: updatedData, error: updatedError } = await supabase
        .from("Speech")
        .update({
          title: speechData.title,
          content: speechData.content,
          date: speechData.date,
        })
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

      //we only query the db for tags if its provided in the post req
      if (tags && tags.length >= 0) {
        const { data: currentTags } = await supabase
          .from("Speech-Tags")
          .select("tag")
          .eq("speechID", speechData.speechID);

        const currentTagSet = new Set(currentTags?.map((t) => t.tag) || []);
        const newTagSet = new Set(tags);

        const tagsToAdd = tags.filter((tag) => !currentTagSet.has(tag));
        const tagsToRemove = [...currentTagSet].filter(
          (tag) => !newTagSet.has(tag)
        );

        if (tagsToAdd.length > 0) {
          const { error: insertTagsError } = await supabase
            .from("Speech-Tags")
            .insert(
              tagsToAdd.map((tag) => ({ speechID: speechData.speechID, tag }))
            );

          if (insertTagsError) {
            console.error("Error inserting tags:", insertTagsError);
          }
        }

        if (tagsToRemove.length > 0) {
          const { error: deleteTagsError } = await supabase
            .from("Speech-Tags")
            .delete()
            .eq("speechID", speechData.speechID)
            .in("tag", tagsToRemove);

          if (deleteTagsError) {
            console.error("Error deleting tags:", deleteTagsError);
          }
        }
      }

      return new NextResponse(
        JSON.stringify({
          response: "Speech updated successfully",
          speech: updatedData,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {      const { data: insertedData, error: insertedError } = await supabase
        .from("Speech")
        //over here we insert everything except the tags, cos it doesnt exist in the db
        .insert({speechID: speechData.speechID, title: speechData.title, content: speechData.content, date: speechData.date}) // date is already an ISO string from frontend
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

      if (tags && tags.length > 0) {
        const { error: insertTagsError } = await supabase
          .from("Speech-Tags")
          .insert(
            tags.map((tag) => ({ speechID: insertedData.speechID, tag }))
          );

        if (insertTagsError) {
          console.error("Error inserting tags:", insertTagsError);
        }
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
    let speechIdsQuery = supabase
      .from("Delegate-Speech")
      .select("speechID");
    
    if (delegateID) {
      speechIdsQuery = speechIdsQuery.eq("delegateID", delegateID);
    }
    
    const { data: delegateSpeechIds, error: delegateSpeechError } = await speechIdsQuery;
    
    if (delegateSpeechError) {
      throw delegateSpeechError;
    }
    
    if (!delegateSpeechIds || delegateSpeechIds.length === 0) {
      return new NextResponse(JSON.stringify({ speeches: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    const speechIds = delegateSpeechIds.map(item => item.speechID);
    
    const { data: speeches, error: speechesError } = await supabase
      .from("Speech")
      .select("*")
      .in("speechID", speechIds)
      .order("date", { ascending: false });
    
    if (speechesError) {
      throw speechesError;
    }
    
    const { data: allTags, error: tagsError } = await supabase
      .from("Speech-Tags")
      .select("speechID, tag")
      .in("speechID", speechIds);
    
    if (tagsError) {
      throw tagsError;
    }
    
    const tagsBySpeechId: Record<string, string[]> = {};
    allTags?.forEach(tagRecord => {
      if (!tagsBySpeechId[tagRecord.speechID]) {
        tagsBySpeechId[tagRecord.speechID] = [];
      }
      tagsBySpeechId[tagRecord.speechID].push(tagRecord.tag);
    });
    
    const processedSpeeches = speeches?.map(speech => ({
      ...speech,
      tags: tagsBySpeechId[speech.speechID] || []
    }));

    return new NextResponse(JSON.stringify({ speeches: processedSpeeches }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error in GET /api/speeches:", errorMessage);

    return new NextResponse(
      JSON.stringify({ message: `Error fetching speeches: ${errorMessage}` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
