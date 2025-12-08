import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabase.from("blogs").select("*");

    if (error) throw new Error(error.message);

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Internal Server Error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("blogs")
      .insert([{ title, content }]);

    if (error) throw new Error(error.message);

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Internal Server Error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
