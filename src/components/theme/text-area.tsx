import { Textarea } from "@/components/ui/textarea"
import React from "react"

export function TextareaDemo({ ...props }: React.ComponentProps<"textarea">) {
  return <Textarea placeholder="Mesajınızı buraya yazın." {...props} />
}
