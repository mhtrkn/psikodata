"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function TagInput({
  value = [],
  onChange,
  placeholder = "Etiket ekle ve Enter'a bas",
  className = ""
}: {
  value: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
  className?: string
}) {
  const [inputValue, setInputValue] = useState("")

  const addTag = (tag: string) => {
    const cleaned = tag.trim()
    if (!cleaned) return
    if (value.includes(cleaned)) return

    onChange([...value, cleaned])
    setInputValue("")
  }

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag(inputValue)
    }
  }

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Input */}
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />

      {/* Tag List */}
      <div className="flex items-center flex-wrap gap-2">
        {value.map((tag, i) => (
          <Badge
            key={i}
            variant="secondary"
            className="flex items-center gap-1 pr-1 py-1.5 pl-2"
          >
            {tag}

            <button
              type="button"
              className="rounded-sm hover:bg-muted cursor-pointer"
              onClick={() => removeTag(tag)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  )
}
