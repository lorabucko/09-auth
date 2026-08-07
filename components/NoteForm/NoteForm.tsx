'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import css from './NoteForm.module.css'
import { createNote } from '../../lib/api/clientApi'
import { useNoteStore } from '../../lib/store/noteStore'
import type { NoteTag } from '../../types/note'

type NoteFormValues = {
  title: string
  content: string
  tag: NoteTag
}

export default function NoteForm() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const draft = useNoteStore((state) => state.draft)
  const setDraft = useNoteStore((state) => state.setDraft)
  const clearDraft = useNoteStore((state) => state.clearDraft)

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft()
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      router.push('/notes/filter/all')
    },
  })

  const formAction = (formData: FormData) => {
    const values: NoteFormValues = {
      title: String(formData.get('title') ?? '').trim(),
      content: String(formData.get('content') ?? '').trim(),
      tag: String(formData.get('tag') ?? 'Todo') as NoteTag,
    }

    mutation.mutate(values)
  }

  return (
    <form action={formAction} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          minLength={3}
          maxLength={50}
          required
          className={css.input}
          defaultValue={draft.title}
          onChange={(e) => setDraft({ title: e.target.value })}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          maxLength={500}
          rows={8}
          className={css.textarea}
          defaultValue={draft.content}
          onChange={(e) => setDraft({ content: e.target.value })}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          defaultValue={draft.tag}
          onChange={(e) => setDraft({ tag: e.target.value as NoteTag })}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  )
}
