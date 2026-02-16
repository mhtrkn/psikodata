
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      slug,
      excerpt,
      content,
      thumbnail,
      category,
      tags,
      is_published,
      author_id,
      is_featured,
    } = body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Title, slug ve content zorunludur." },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from("blogs")
      .insert([
        {
          title,
          slug,
          excerpt,
          content,
          thumbnail,
          category,
          tags,
          is_published,
          author_id,
          is_featured,
        },
      ])
      .select()
      .single(); // 👈 Ekledik

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Blog oluşturulamadı." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      blog: data,
    });

  } catch (err) {
    console.error("Create blog error:", err);

    return NextResponse.json(
      { error: "Server error." },
      { status: 500 }
    );
  }
}
