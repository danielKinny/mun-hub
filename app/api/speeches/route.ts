import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { Speech, Delegate } from "@/db/types";

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
    const newSpeech: Speech = await request.json();
    const dataFilePath = path.join(process.cwd(), "db/data.json");

    let data;
    try {
      const fileContent = readFileSync(dataFilePath, "utf-8");
      data = JSON.parse(fileContent);
    } catch (readError: unknown) {
      if ((readError as NodeJS.ErrnoException).code === "ENOENT") {
        data = { speeches: [], delegates: [] };
      } else if (readError instanceof SyntaxError) {
        return new NextResponse(
          JSON.stringify({ message: "Error parsing JSON in data.json" }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      } else {
        return new NextResponse(
          JSON.stringify({ message: "Error reading data.json" }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
      if (!data) {
        return new NextResponse(
          JSON.stringify({ message: "Data is undefined" }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    if (!data.speeches) {
      data.speeches = [];
      data.delegates = [];
    }

    const existingSpeechIndex = data.speeches.findIndex(
      (speech: Speech) => speech.speechID === newSpeech.speechID
    );
    const existingDelegateIndex = data.delegates.findIndex(
      (delegate: Delegate) => delegate.id === newSpeech.speechID.substring(0, 4)
    );
    if (existingSpeechIndex !== -1) {
      data.speeches[existingSpeechIndex] = newSpeech;
    } else {
      data.speeches.push(newSpeech);
      data.delegates[existingDelegateIndex].speechCount += 1;
    }

    writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

    return new NextResponse(
      JSON.stringify({
        message: "Speech added successfully",
        speech: newSpeech,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );  } catch (error: unknown) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Unknown error occurred';
      
    return new NextResponse(
      JSON.stringify({ message: `Error adding speech: ${errorMessage}` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
