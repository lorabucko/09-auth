import { cookies } from 'next/headers'
import { api } from './api'
import type { Note } from '../../types/note'
import type { User } from '../../types/user'
import type { FetchNotesParams, FetchNotesResponse } from './clientApi'

export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies()

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
    headers: {
      Cookie: cookieStore.toString(),
    },
  })

  return data
}

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies()

  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  })

  return data
}

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies()

  const { data } = await api.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  })

  return data
}

export const checkSession = async () => {
  const cookieStore = await cookies()

  const res = await api.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  })

  return res
}
