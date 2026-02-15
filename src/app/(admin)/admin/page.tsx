"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes";

export default function AdminRootPage() {
  const router = useRouter();

  useEffect(() => {
    router.push(ROUTES.ADMIN.DASHBOARD);
  }, [router]);

  return null;
}
