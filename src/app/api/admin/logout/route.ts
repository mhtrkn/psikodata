import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Çıkış yapıldı" });

  response.cookies.set({
    name: "admin_token",
    value: "",
    path: "/",
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  return response;
}
