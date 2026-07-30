import axios from 'axios'
import type { Note, NoteTag } from '../types/note'

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN

const noteHubApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
type TagFilter = NoteTag | 'all'

export interface FetchNotesParams {
  page: number
  perPage: number
  search?: string
  tag?: TagFilter
}

export interface FetchNotesResponse {
  notes: Note[]
  totalPages: number
}

export interface CreateNotePayload {
  title: string
  content: string
  tag: NoteTag
}

export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = {
    page,
    perPage,
  }

  if (search) {
    params.search = search
  }

  if (tag && tag !== 'all') {
    params.tag = tag
  }

  const { data } = await noteHubApi.get<FetchNotesResponse>('/notes', {
    params,
  })

  return data
}

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await noteHubApi.get<Note>(`/notes/${id}`)
  return data
}

export const createNote = async (newNote: CreateNotePayload): Promise<Note> => {
  const { data } = await noteHubApi.post<Note>('/notes', newNote)

  return data
}

export const deleteNote = async (noteId: string): Promise<Note> => {
  const { data } = await noteHubApi.delete<Note>(`/notes/${noteId}`)

  return data
}
