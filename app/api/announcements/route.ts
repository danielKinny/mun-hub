import supabase from "@/lib/supabase";
import { Announcement } from "@/db/types";

export async function GET(request: Request) {
  try {
    const { data, error } = await supabase
      .from('Announcement')
      .select('*')

    if (error) {
      return new Response(
        JSON.stringify({ message: `Error fetching announcements: ${error.message}` }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify(data as Announcement[]),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ message: 'Error fetching announcements' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}