import React, { useEffect } from 'react'
import styles from '../styles/Navbar.module.css'
import Link from 'next/link'
import Router from 'next/router'
import { Icon, Input, Dropdown } from "semantic-ui-react";

export default function Navbar() {

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    Router.push({pathname: "/login"})
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
            <Link href="/saved">
              <Icon size="large" name="bookmark" />
            </Link>
          </li>

          <li>
            <Dropdown className={styles.dropdown} icon="user circle">
              <Dropdown.Menu>
                <Dropdown.Item text='Your Profile' />
                <Dropdown.Item text='Your Posts'/>
                <Dropdown.Item text='Bid Placed'/>
                <Dropdown.Item text='Saved' />
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout} text='Logout' />
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </div>
    </div>
  )
}
