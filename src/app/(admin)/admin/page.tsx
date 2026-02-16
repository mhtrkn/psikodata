"use client";

import { JSX, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes";

export default function AdminRootPage(): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    router.push(ROUTES.ADMIN.DASHBOARD);
  }, [router]);

  return null;
}
