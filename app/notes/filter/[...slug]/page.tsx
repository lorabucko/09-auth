import type { Metadata } from 'next'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query'
import { fetchNotes } from '@/lib/api'
import NotesClient from './Notes.client'
import type { NoteTag } from '@/types/note'

const PER_PAGE = 12

type TagFilter = NoteTag | 'all'

type PageProps = {
  params: Promise<{
    slug?: string[]
  }>
}

function formatFilterName(value: string): string {
  if (!value) return 'All'
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug ?? ['all']
  const rawTag = slug[0] ?? 'all'
  const filterName = formatFilterName(rawTag)

  const title = `${filterName} notes | NoteHub`
  const description = `Browse ${filterName.toLowerCase()} notes in NoteHub.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.com/notes/filter/${rawTag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub application preview',
        },
      ],
    },
  }
}

export default async function NotesFilterPage({ params }: PageProps) {
  const queryClient = new QueryClient()

  const initialPage = 1
  const initialSearch = ''

  const resolvedParams = await params
  const slug = resolvedParams.slug ?? ['all']

  const rawTag = slug[0] ?? 'all'
  const tagFromSlug: TagFilter = rawTag as TagFilter

  await queryClient.prefetchQuery({
    queryKey: ['notes', initialSearch, initialPage, tagFromSlug],
    queryFn: () =>
      fetchNotes({
        page: initialPage,
        perPage: PER_PAGE,
        search: initialSearch || undefined,
        tag: tagFromSlug,
      }),
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient
        initialPage={initialPage}
        initialSearch={initialSearch}
        tag={tagFromSlug}
      />
    </HydrationBoundary>
  )
}
