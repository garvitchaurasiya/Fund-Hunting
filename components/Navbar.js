import React, { useEffect } from 'react'
import styles from '../styles/Navbar.module.css'
import Link from 'next/link'
import Router from 'next/router'
import { Icon, Input } from "semantic-ui-react";

export default function Navbar() {

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  useEffect(() => {

    if (!localStorage.getItem('token')) {
      Router.push({ pathname: '/login' })
    }

  }, [])


  return (
    <div className={styles.container}>
      <div className={styles.fundhunting}>
        Fund Hunting
      </div>
      <div className={styles.search}>
        <Input icon="search" placeholder='Search' />
      </div>
      <div>
        <ul className={styles.list}>
          <li>
            <Link href="/">
              <Icon size="large" name="home" />
            </Link>
          </li>
          <li>
            <Link href="/video/post">
              <Icon size="large" name="add square" />
            </Link>
          </li>
          <li>
            <Link href="/">
              <Icon size="large" name="bookmark" />
            </Link>
          </li>

          <li onClick={handleLogout} >
            <Link href="/login">
              <Icon size="large" name="user circle" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
