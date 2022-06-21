import React, {useEffect} from 'react'
import { Icon } from 'semantic-ui-react'
import Navbar from '../components/Navbar'
import Videos from '../components/Videos'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Router from 'next/router'

export default function Home() { 

  return (
    <div style={{ "backgroundColor": "#f3f2ef" }}>
      <Navbar />
      <div style={{ 'paddingTop': '70px', 'display': 'flex', 'justifyContent': 'space-evenly' }}>
        <div>

          <div className={styles.userinfo}>
            <Icon size="huge" name="user circle" />
            <h4 suppressHydrationWarning> {(typeof window !== 'undefined')?localStorage.getItem('username'):"asdf"}</h4>
          </div>

          <div className={styles.optionsContainer}>

            <div className={styles.options}>
              <Link href="/">
                Posts
              </Link>
            </div>

            <div className={styles.options}>
              <Link href="/">
                Bid Placed
              </Link>
            </div>
            <div className={styles.options}>
              <Link href="/saved">
                Saved
              </Link>
            </div>
          </div>
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
