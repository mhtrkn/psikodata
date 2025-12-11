/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", params.slug)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Blog bulunamadı." },
        { status: 404 }
      );
    }

    return NextResponse.json({ blog: data });
  } catch (err) {
    return NextResponse.json(
      { error: "Server error." },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await req.json();

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from("blogs")
      .update(body)
      .eq("slug", params.slug)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, blog: data });
  } catch (err) {
    return NextResponse.json(
      { error: "Server error." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const supabase = createServerClient();

    const { error } = await supabase
      .from("blogs")
      .delete()
      .eq("slug", params.slug);

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
