'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { useDebouncedCallback } from 'use-debounce'
import { fetchNotes } from '../../../../lib/api'
import css from './NotesPage.module.css'
import NoteList from '../../../../components/NoteList/NoteList'
import Pagination from '../../../../components/Pagination/Pagination'
import SearchBox from '../../../../components/SearchBox/SearchBox'
import type { NoteTag } from '@/types/note'

type TagFilter = NoteTag | 'all'

const PER_PAGE = 12

interface NotesClientProps {
  initialPage: number
  initialSearch: string
  tag: TagFilter
}

export default function NotesClient({
  initialPage,
  initialSearch,
  tag,
}: NotesClientProps) {
  const [searchValue, setSearchValue] = useState(initialSearch)
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch)
  const [currentPage, setCurrentPage] = useState(initialPage)

  const updateSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value.trim())
    setCurrentPage(1)
  }, 500)

  const handleSearch = (value: string) => {
    setSearchValue(value)
    updateSearch(value)
  }

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['notes', debouncedSearch, currentPage, tag],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        perPage: PER_PAGE,
        search: debouncedSearch || undefined,
        tag,
      }),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  })

  return (
    <main className={css.main}>
      <div className={css.container}>
        <header className={css.toolbar}>
          <SearchBox value={searchValue} onSearch={handleSearch} />

          {data && data.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}

          <Link href="/notes/action/create" className={css.button}>
            Create note +
          </Link>
        </header>

        {isLoading && <p>Loading, please wait...</p>}
        {isError && <p>Could not fetch the list of notes. Please try again.</p>}
        {isFetching && !isLoading && <p>Updating...</p>}

        {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      </div>
    </main>
  )
}
