import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { Speech, Delegate, Database } from "@/db/types";
import { useSession } from "../../context/sessionContext";

export async function DELETE(request: Request) {
  try {
    const { speechID } = await request.json();
    const dataFilePath = path.join(process.cwd(), "db/data.json");

    let data;
    try {
      const fileContent = readFileSync(dataFilePath, "utf-8");
      data = JSON.parse(fileContent);
    } catch {
      return new NextResponse(
        JSON.stringify({ message: "Error reading data.json" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!data.speeches) {
      return new NextResponse(
        JSON.stringify({ message: "No speeches found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const initialLength = data.speeches.length;
    data.speeches = data.speeches.filter(
      (speech: Speech) => speech.speechID !== speechID
    );

    if (data.speeches.length === initialLength) {
      return new NextResponse(JSON.stringify({ message: "Speech not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

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

    let found = false;

    let speechData: Speech = await request.json();
    const dataFilePath = path.join(process.cwd(), "db/data.json");
    const fileData : Database= JSON.parse(readFileSync(dataFilePath, "utf-8"));

    let delegateIndex = fileData.delegates.findIndex(
      (delegate: Delegate) => delegate?.id === speechData.speechID.split("-")[0]
    );

    let existingIndex = fileData.speeches.findIndex(
      (speech: Speech) => speech.speechID === speechData.speechID
    );

    if (
      existingIndex !== -1
    ) {
      fileData.speeches[existingIndex] = speechData;
      found = true;
    } else {
      fileData.speeches.push(speechData);
    }

    fileData.delegates[delegateIndex].speechCount += 1;
    writeFileSync(dataFilePath, JSON.stringify(fileData, null, 2));

    return new NextResponse(
      JSON.stringify({ response: "Speech added successfully", speech : speechData, found: found }),
      { status: 200, headers: { "Content-Type": "application/json" } } 
    );

  } catch {
    return new NextResponse(
      JSON.stringify({ message: "Error reading data.json" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const delegateID = searchParams.get("delegateID");
    const dataFilePath = path.join(process.cwd(), "db/data.json");
    const fileContent = readFileSync(dataFilePath, "utf-8");
    const data = JSON.parse(fileContent);

    if (!data.speeches) {
      return new NextResponse(
        JSON.stringify({ message: "No speeches found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const filteredSpeeches: Speech[] = data.speeches.filter((speech: Speech) =>
      speech.speechID.startsWith(delegateID ? delegateID : "")
    );

    return new NextResponse(JSON.stringify({ speeches: filteredSpeeches }), {
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
