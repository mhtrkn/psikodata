/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  req: NextRequest,
  { params }: Params
) {
  const { id } = await params;

  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from("authors")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Author bilgisi bulunamadı." },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Server error." },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: Params
) {
  const { id } = await params;

  try {
    const body = await req.json();

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from("authors")
      .update(body)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { error: "Server error." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
  const { id } = await params;

  try {
    const supabase = createServerClient();

    const { error } = await supabase
      .from("authors")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Server error." },
      { status: 500 }
    );
  }
}
