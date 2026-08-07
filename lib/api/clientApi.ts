import { api } from './api'
import type { Note, NoteTag } from '../../types/note'
import type { User } from '../../types/user'

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

export interface RegisterRequest {
  email: string
  password: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface UpdateMeRequest {
  username?: string
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

  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params,
  })
  console.log('fetchNotes response:', data)
  return data
}

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`)
  return data
}

export const createNote = async (newNote: CreateNotePayload): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', newNote)
  return data
}

export const deleteNote = async (noteId: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${noteId}`)
  return data
}

export const register = async (payload: RegisterRequest): Promise<User> => {
  const { data } = await api.post<User>('/auth/register', payload)
  return data
}

export const login = async (payload: LoginRequest): Promise<User> => {
  const { data } = await api.post<User>('/auth/login', payload)
  return data
}

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout')
}

export const checkSession = async (): Promise<boolean> => {
  const { data } = await api.get('/auth/session')
  return Boolean(data)
}

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>('/users/me')
  return data
}

export const updateMe = async (payload: UpdateMeRequest): Promise<User> => {
  const { data } = await api.patch<User>('/users/me', payload)
  return data
}
