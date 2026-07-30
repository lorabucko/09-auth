'use client'

import css from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Lora Bucko</p>
          <p>
            Contact us:{' '}
            <a href="mailto:lorabucko@notehub.app">lorabucko@notehub.app</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
