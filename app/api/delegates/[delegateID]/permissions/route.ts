import supabase from "@/lib/supabase";

export async function PUT(
  request: Request,
  { params }: { params: { delegateID: string } }
) {
  try {
    const delegateID = params.delegateID;
    const body = await request.json();
    
    if (!body.resoPerms) {
      return new Response(
        JSON.stringify({ error: "resoPerms is required" }),
        { status: 400 }
      );
    }

    const { resoPerms } = body;
    if (
      typeof resoPerms !== "object" ||
      !("view:ownreso" in resoPerms) ||
      !("view:allreso" in resoPerms) ||
      !("update:ownreso" in resoPerms)
    ) {
      return new Response(
        JSON.stringify({
          error: "Invalid resoPerms structure. Required properties: view:ownreso, view:allreso, update:ownreso",
        }),
        { status: 400 }
      );
    }

    // Update the delegate's permissions
    const { data, error } = await supabase
      .from("Delegate")
      .update({ resoPerms })
      .eq("delegateID", delegateID)
      .select();

    if (error) {
      console.error("Error updating delegate permissions:", error);
      return new Response(
        JSON.stringify({ error: "Failed to update permissions" }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify(data[0]), { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
