import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    // 1. DİKKAT: createServerClient genellikle await gerektirir (Next.js cookies için)
    const supabase = await createServerClient();

    const { data, error } = await supabase
      .from("authors")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase Hatası:", error); // Terminalde hatayı görmek iyidir
      return NextResponse.json(
        { success: false, message: "Yazarlar getirilemedi.", error: error.message },
        { status: 500 }
      );
    }

    // Frontend ile uyum için direkt diziyi veya açık objeyi döndürün
    return NextResponse.json(data, { status: 200 });

    /* Eğer frontend'de: setAuthors(data.authors) yapacaksanız
       return NextResponse.json({ success: true, authors: data }, { status: 200 });
       şeklinde bırakın.
    */
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "Sunucu hatası.",
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
