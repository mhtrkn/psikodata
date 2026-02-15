"use client";

import { blogService } from "@/services/blog-service";
import BlogList from "@/views/admin/blog-list";
import { useEffect, useState } from "react";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await blogService.getAll();
      setBlogs(data);
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div className="flex-1">
      <BlogList data={blogs} loading={loading} />
    </div>
  );
}
