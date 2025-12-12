import { UUID } from "crypto";

export interface AuthorType {
  id: UUID,
  name: string,
  role: string,
  avatar_url?: string | null,
  created_at: string,
}

export interface Authors {
  authors: AuthorType[]
}
