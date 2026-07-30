import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import NotePreviewClient from '@/app/@modal/(.)notes/[id]/NotePreview.client'

type PageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function NotePreviewPage({ params }: PageProps) {
  const queryClient = new QueryClient()
  const resolvedParams = await params
  const noteId = resolvedParams.id

  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotePreviewClient noteId={noteId} />
    </HydrationBoundary>
  )
}
