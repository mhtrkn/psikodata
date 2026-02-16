import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AuthorType } from "@/types/authors";
import { Trash2, User, Pencil, Calendar } from "lucide-react";
import Image from "next/image";

export function AuthorCard({
  author,
  onDelete,
  onEdit,
}: {
  author: AuthorType;
  onDelete: (id: string) => void;
  onEdit: (author: AuthorType) => void;
}) {
  return (
    <Card className="group relative py-0 overflow-hidden transition-all shadow-sm duration-300 hover:shadow-md">
      {/* Top accent bar */}
      <div className="h-20 bg-linear-to-br from-primary/25 via-primary/5 to-transparent" />

      <CardContent className="flex flex-col items-center px-6 pb-6 -mt-10">
        {/* Avatar */}
        <div className="relative mb-4">
          {author.avatar_url ? (
            <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-background shadow-sm">
              <Image
                src={author.avatar_url}
                alt={author.name}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-accent bg-primary/15 text-primary shadow transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
              <User className="h-8 w-8" />
            </div>
          )}
        </div>

        {/* Author info */}
        <h3 className="font-medium text-lg text-center leading-tight mb-1.5">
          {author.name}
        </h3>
        <Badge variant="outline" className="font-medium mb-3">
          {author.role}
        </Badge>

        {/* Date */}
        {author.created_at && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
            <Calendar className="w-3 h-3" />
            {new Date(author.created_at).toLocaleDateString("tr-TR", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        )}

        <Separator className="mb-4 bg-accent" />

        {/* Actions */}
        <div className="flex items-center gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(author)}
            className="flex-1 gap-1.5 text-muted-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30"
          >
            <Pencil className="h-3! w-3!" />
            Düzenle
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Yazarı Sil?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription>
                <strong>{author.name}</strong> isimli yazar kalıcı olarak silinecektir.
                <br />
                Yazarın blogları etkilenebilir. Devam etmek istediğinize emin misiniz?
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">Vazgeç</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(author.id)}
                  className="bg-destructive cursor-pointer text-destructive-foreground hover:bg-destructive/90"
                >
                  Sil
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
