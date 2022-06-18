import React, {useState, useEffect} from 'react'
import styles from '../styles/Navbar.module.css'
import Link from 'next/link'
import Router from 'next/router'

export default function Navbar() {

  // const [isLoggedin, setIsLoggedin] = useState(localStorage.getItem('user'));
  
	const handleLogout = ()=>{
		localStorage.removeItem('token');
		localStorage.removeItem('user');
	}

  useEffect(() => {
    
    if(!localStorage.getItem('token')){
      Router.push({pathname: '/login'})
    }
    
  }, [])
  

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
        <li>
          {/* <Link href="/">
            <a>{isLoggedin}aldj</a>
          </Link> */}
        </li>

        <li onClick={handleLogout} >
          <Link className="nav_link" href="/login">
            LOGOUT
          </Link>
        </li>

      </ul>
    </div>
  )
}
