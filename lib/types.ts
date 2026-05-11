export interface Post {
  id: string
  title: string
  content: string
  written_at: string
  is_public: boolean
  created_at: string
}

export interface Photo {
  id: string
  url: string
  caption: string | null
  taken_at: string | null
  album_month: string | null
  created_at: string
}

export interface Milestone {
  id: string
  title: string
  description: string | null
  occurred_at: string
  emoji: string
  created_at: string
}
