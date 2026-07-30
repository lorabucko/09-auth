'use client';

import Link from 'next/link';
import css from './AuthNavigation.module.css';

export default function AuthNavigation() {
  return (
    <>
      >
        <Link href="/profile" prefetch={false} className={css.navigationLink}>
          Profile
        </Link>
      </li>
      >
        <p className={css.userEmail}>User email</p>
        <button className={css.logoutButton}>Logout</button>
      </li>
      >
        <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
          Login
        </Link>
      </li>
      >
        <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
          Sign up
        </Link>
      </li>
    </>
  );
}