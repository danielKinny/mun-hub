import supabase from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('Committee')
      .select('*');

    if (error) {
      return new Response(
        JSON.stringify({ message: `Error fetching committees: ${error.message}` }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify(data),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch{
    return new Response(
      JSON.stringify({ message: 'Error fetching committees' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}