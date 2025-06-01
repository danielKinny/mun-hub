import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://newsapi.org/v2/top-headlines?sources=bbc-news,cnn&pageSize=20&apiKey=552d6b1ba18e46b3973512d03fb114aa"
    );
    if (!res.ok) {
      console.error("Failed to fetch articles");
      return new NextResponse(
        JSON.stringify({ message: "Failed to fetch articles" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await res.json();

    return new NextResponse(JSON.stringify(data.articles), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error fetching articles:", e);
    return new NextResponse(
      JSON.stringify({ message: "Error fetching articles" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
