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
import { Trash2, User } from "lucide-react";

export function AuthorCard({ author, onDelete }) {
  return (
    <Card className="group relative overflow-hidden transition-all shadow-2xs shadow-gray-100 duration-300 hover:shadow">
      <CardContent className="px-4 py-2">
        <div className="flex items-center justify-around">
          <div className="flex items-center gap-4">
            {/* Profil İkonu / Avatar Bölümü */}
            <div className="flex h-fit w-fit aspect-square p-2 items-center justify-center rounded-full bg-primary/10 text-primary duration-300 transition-all group-hover:bg-primary group-hover:text-primary-foreground">
              <User className="h-6 w-6" />
            </div>

            {/* Yazar Bilgileri */}
            <div className="space-y-1">
              <h3 className="font-semibold">
                {author.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="secondary" className="font-medium">
                  {author.role}
                </Badge>
              </div>
            </div>
          </div>

          {/* Hover Durumunda Görünen Silme Butonu ve Dialog */}
          <div className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-5 w-5" />
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
        </div>
      </CardContent>
    </Card>
  );
}
