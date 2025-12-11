import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = createServerClient();
  const { name, role } = await req.json();

  if (!name) {
    return NextResponse.json({ message: "Yazar adı zorunludur." }, { status: 400 });
  }

  const { error } = await supabase.from("authors").insert({
    name,
    role
  });

  if (error) {
    return NextResponse.json({ message: "Yazar eklenirken hata oluştu.", error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
