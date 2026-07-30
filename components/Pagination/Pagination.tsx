import * as ReactPaginateModule from 'react-paginate'
import type { ReactPaginateProps } from 'react-paginate'
import type { ComponentType } from 'react'
import css from './Pagination.module.css'

interface PaginationProps {
  totalPages: number
  currentPage: number
  onPageChange: (nextPage: number) => void
}

type ReactPaginateModuleWithDefault = {
  default?: ComponentType<ReactPaginateProps>
}

const ReactPaginate: ComponentType<ReactPaginateProps> =
  (ReactPaginateModule as ReactPaginateModuleWithDefault).default ||
  (ReactPaginateModule as unknown as ComponentType<ReactPaginateProps>)

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  )
}
