export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping'
export type TagFilter = NoteTag | 'all'
export interface Note {
  id: string
  title: string
  content: string
  tag: NoteTag
  createdAt: string
  updatedAt: string
}
