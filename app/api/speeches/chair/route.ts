import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";
// this is gonna be for chairs, they need seperate logic because their ids can overlap with delegates

//no delete request, it doesnt really matter honestly, cos the logic is the same as for delegates

export async function POST(request: Request) {
  const body = await request.json();
  let speechID = body.speechData.speechID
  const chairID = body.chairID

  console.log(speechID)

  //marks the start of speech creation logic if it is a new speech

  if (speechID === "-1"){
    
    const {data} = await supabase
    .from('Speech')
    .select('speechID');

    if (!data || data.length === 0 ) {
      speechID = "0001";
    } else {
    data.sort((a, b) => a.speechID.localeCompare(b.speechID));
    speechID = data.length > 0 ? (parseInt(data[data.length-1].speechID)+1).toString().padStart(4,'0') : '0001';
  }

  const { error : insertedError} = await supabase
  .from('Speech')
  .insert(
    {
      speechID: speechID,
      content: body.speechData.content,
      title: body.speechData.title,
      date: body.speechData.date,
    }
  )

  if (insertedError) {
    return new NextResponse(
      JSON.stringify({ message: "Error inserting speech", error: insertedError.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const {error: junctionError } = await supabase
  .from("Chair-Speech")
  .insert({
    speechID: speechID,
    chairID: chairID,
  })

  if (junctionError){
    return new NextResponse(
      JSON.stringify({ message: "Error inserting into junction table" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }


  //gonna insert tags now
  //no need to check for existing tags cos this is assumed to be a new speech

  if(body.speechData.tags && body.speechData.tags.length > 0 ) {
    const tagRows = body.speechData.tags.map((tag: string) => ({ speechID, tag }));
    const { error: tagError } = await supabase
      .from("Speech-Tags")
      .insert(tagRows);

    if (tagError) {
      return new NextResponse(
        JSON.stringify({ message: `Error inserting tags: ${tagError.message}` }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }


  return new NextResponse(
    JSON.stringify({ message: "Speech created successfully", speechID }),
    { status: 201, headers: { "Content-Type": "application/json" } }
  );

} else {
  const { error: updateError } = await supabase
    .from("Speech")
    .update({
      content: body.speechData.content,
      title: body.speechData.title,
      date: body.speechData.date
    })
    .eq("speechID", speechID);
  if (updateError) {
    return new NextResponse(
      JSON.stringify({ message: `Error updating speech: ${updateError.message}` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
  // Update tags
  if (body.speechData.tags) {
    const { error: deleteTagsError } = await supabase
      .from("Speech-Tags")
      .delete()
      .eq("speechID", speechID);

    if (deleteTagsError) {
      return new NextResponse(
        JSON.stringify({ message: `Error deleting existing tags: ${deleteTagsError.message}` }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    if (body.speechData.tags.length > 0) {
      const tagRows = body.speechData.tags.map((tag: string) => ({ speechID, tag }));
      const { error: tagInsertError } = await supabase
        .from("Speech-Tags")
        .insert(tagRows);

      if (tagInsertError) {
        return new NextResponse(
          JSON.stringify({ message: `Error inserting tags: ${tagInsertError.message}` }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    }
  }

  return new NextResponse(
    JSON.stringify({ message: "Speech updated successfully", speechID }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const chairIDParam = searchParams.get("chairID");
    
    const speechesQuery = supabase
      .from("Chair-Speech")
      .select("speechID")
      .eq("chairID", chairIDParam)
    
    const { data: speechIDs, error: speechesError } = await speechesQuery;
    
    if (speechesError) {
      throw speechesError;
    }
    
    if (!speechIDs || speechIDs.length === 0) {
      return new NextResponse(JSON.stringify({ speeches: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const {data : speeches, error: speechesDataError} = await supabase
      .from("Speech")
      .select("*")
      .in("speechID", speechIDs.map(s => s.speechID));

    if (speechesDataError) {
      throw speechesDataError;
    }
    
    const { data: allTags, error: tagsError } = await supabase
      .from("Speech-Tags")
      .select("speechID, tag")
       .in("speechID", speechIDs.map(s => s.speechID));
    
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
