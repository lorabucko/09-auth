import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { NoteTag } from '@/types/note'

type NoteDraft = {
  title: string
  content: string
  tag: NoteTag
}

type NoteStore = {
  draft: NoteDraft
  setDraft: (note: Partial<NoteDraft>) => void
  clearDraft: () => void
}

export const initialDraft: NoteDraft = {
  title: '',
  content: '',
  tag: 'Todo',
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note: Partial<NoteDraft>) =>
        set((state: NoteStore) => ({
          draft: {
            ...state.draft,
            ...note,
          },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft-storage',
      partialize: (state) => ({
        draft: state.draft,
      }),
    }
  )
)
