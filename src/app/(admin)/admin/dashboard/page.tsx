"use client";

import BlogList from "@/views/admin/blog-list";
import NewBlog from "@/views/admin/new-blog";
import { useSearchParams } from "next/navigation";
import { JSX } from "react";

const COMPONENT_MAP: Record<string, JSX.Element> = {
  "new-blog": <NewBlog />,
  "blog-list": <BlogList />,
};

export default function AdminDashboardPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("activeTab") || "blog-list";

  const SelectedComponent =
    COMPONENT_MAP[activeTab] || COMPONENT_MAP["blog-list"];

  return (
    <div className="flex-1 bg-card rounded-2xl p-6">
      {SelectedComponent}
    </div>
  );
}
