import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from("authors")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { success: false, message: "Yazarlar getirilemedi.", error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        authors: data,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "Sunucu hatası.",
        error: String(err),
      },
      { status: 500 }
    );
  }
}
