"use client";

import { useEffect, useState } from "react";
import BlogList from "@/views/admin/blog-list";
import NewAuthors from "@/views/admin/new-authors";
import NewBlog from "@/views/admin/new-blog";
import { useSearchParams } from "next/navigation";
import { JSX } from "react";
import { blogService } from "@/services/blog-service";

export default function AdminDashboardPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("activeTab") || "blog-list";

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // BLOG DATA FETCH
  useEffect(() => {
    async function fetchData() {
      if (activeTab === "blog-list") {
        setLoading(true);
        const data = await blogService.getAll();
        setBlogs(data);
        setLoading(false);
      }
    }

    fetchData();
  }, [activeTab]);

  // COMPONENT MAP
  const COMPONENT_MAP: Record<string, JSX.Element> = {
    "new-blog": <NewBlog />,
    "blog-list": <BlogList data={blogs} loading={loading} />,
    "new-authors": <NewAuthors />,
  };

  const SelectedComponent =
    COMPONENT_MAP[activeTab] || COMPONENT_MAP["blog-list"];

  return (
    <div className="flex-1 bg-card rounded-2xl p-6">
      {SelectedComponent}
    </div>
  );
}
