import React from 'react'
import { Icon } from 'semantic-ui-react'
import Navbar from '../components/Navbar'
import Videos from '../components/Videos'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {



  return (
    <div style={{ "backgroundColor": "#f3f2ef" }}>
      <Navbar />
      <div style={{ 'paddingTop': '70px', 'display': 'flex', 'justifyContent': 'space-evenly' }}>

        <div className={styles.userinfo}>
          <Icon size="huge" name="user circle" />
          <h3>{localStorage.getItem('user')}</h3>
          <Link href="/">
            Posts
          </Link>
          <Link href="/">
            Bid Placed
          </Link>
          <Link href="/">
            Saved
          </Link>
        </div>
        <div>
          <Videos />
        </div>

        <div className={styles.userinfo}>

        </div>

      </div>
    </div>
  )
}
