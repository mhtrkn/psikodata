// import { Separator } from "@/components/ui/separator";

// export default function BlogList({ data, loading }) {
//   if (loading) return <p>Loading...</p>;

//   return (
//     <>
//       <div className="flex flex-col gap-10">
//         <div className="flex flex-col gap-4">
//           <h1 className="text-2xl font-medium text-card-foreground">
//             Blog Listesi
//           </h1>
//           <Separator />
//         </div>
//       </div>
//       <div>
//         {data?.length === 0 ? (
//           <p>Henüz blog yok.</p>
//         ) : (
//           data.map((blog) => (
//             <div key={blog.id}>
//               <h2>{blog.title}</h2>
//             </div>
//           ))
//         )}
//       </div>
//     </>
//   );
// }


import { Separator } from "@/components/ui/separator";
import { Loader2, FileText } from "lucide-react";
import BlogItem from "../blog/blog-item";

export default function BlogList({ data, loading }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p>Yazılar hazırlanıyor...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-medium text-card-foreground">
            Blog Listesi
          </h1>
          <Separator />
        </div>
      </div>

      <div className="grid gap-4">
        {data?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed rounded-xl bg-muted/30">
            <FileText className="h-10 w-10 text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground font-medium">Henüz bir blog yazısı bulunmuyor.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {data.map((blog) => (
              <BlogItem
                key={blog.slug}
                title={blog.title}
                description={blog.excerpt}
                badge={blog.category}
                url={blog.editUrl}
                imageUrl={blog.imageUrl}
                isDeletable={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
