'use client'

import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import Modal from '@/components/Modal/Modal'
import css from './NotePreview.module.css'
import type { Note } from '@/types/note'

type NotePreviewClientProps = {
  noteId: string
}

export default function NotePreviewClient({ noteId }: NotePreviewClientProps) {
  const router = useRouter()

  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  })

  const handleClose = () => {
    router.back()
  }

  return (
    <Modal onClose={handleClose}>
      {isLoading && <p>Loading note...</p>}
      {isError && <p>Could not load the note. Please try again.</p>}

      {data && (
        <div className={css.container}>
          <h2 className={css.title}>{data.title}</h2>
          <p className={css.tag}>{data.tag}</p>
          <p className={css.content}>{data.content}</p>
          <p className={css.date}>{data.createdAt}</p>
        </div>
      )}

      {!isLoading && !isError && !data && <p>No note data available.</p>}
    </Modal>
  )
}
