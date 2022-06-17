import React from 'react'
import styles from '../../styles/Navbar.module.css'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div>
      <ul className={styles.list}>
        <li>
          <Link href="/">
            <a>FundHunting</a>
          </Link>
        </li>
        <li>
          <Link href="/video/post">
            <a>Post</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>About</a>
          </Link>
        </li>

      </ul>
    </div>
  )
}
