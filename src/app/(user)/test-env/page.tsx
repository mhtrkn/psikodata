"use client";

import { Button } from "@/components/ui/button";
import { createBrowserClient } from "@/lib/supabase/client";

export default function TestEnv() {
  const supabase = createBrowserClient();
  console.log("NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 20) + "...");

  const test = async () => {
    const { data } = await supabase.from("blogs").select("*");
    console.log(data);
  };

  return (
    <div className="p-4">
      <h2>Env test sayfası</h2>
      <Button onClick={test}>Datayı Gör</Button>
    </div>
  );
}

