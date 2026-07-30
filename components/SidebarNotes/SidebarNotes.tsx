'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import css from './SidebarNotes.module.css'
import type { NoteTag } from '@/types/note'

const TAGS: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']

export function SidebarNotes() {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  return (
    <aside className={css.sidebar}>
      <nav>
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href="/notes/filter/all"
              className={
                isActive('/notes/filter/all')
                  ? css.menuLinkActive
                  : css.menuLink
              }
            >
              All notes
            </Link>
          </li>

          {TAGS.map((tag) => {
            const href = `/notes/filter/${tag}`
            return (
              <li key={tag} className={css.menuItem}>
                <Link
                  href={href}
                  className={isActive(href) ? css.menuLinkActive : css.menuLink}
                >
                  {tag}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
