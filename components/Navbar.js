import React, { useState, useEffect } from 'react'
import styles from '../styles/Navbar.module.css'
import Link from 'next/link'
import { Router } from '../routes';
import { Icon, Input, Dropdown } from "semantic-ui-react";

export default function Navbar() {
  const [userName, setuserName] = useState("")
  const [searchedUsers, setSearchedUsers] = useState([]);
  let searchTerm = "";
  useEffect(() => {

    if (!localStorage.getItem('token')) {
      Router.push({ pathname: '/login' })
    } else {
      setuserName(localStorage.getItem('username'));
    }
    changeSearchTerm();

  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    Router.pushRoute("/login")
  }

  const filterContent = (users, searchTerm) => {
    // const result = users.filter((user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()));
    // console.log(result);
    // result.map((element, index)=>{
    //   setSearchedUsers(oldArray => [...oldArray, {key: index, text: element.username}])
    //   setSearchedUsers(oldArray => [...oldArray, {key: index, text: element.username}])
    //   setSearchedUsers(oldArray => [...oldArray, {key: index, text: element.username}])
    // })
    // setSearchedUsers(result);
  }

  const changeSearchTerm = async (e) => {
    // setSearchTerm({...searchTerm, [e.target.name]:e.target.value});
    // searchTerm = e.target.value;
    const response = await fetch("http://localhost:5000/api/auth/allusers", {
      method: "GET",
      headers: {
        'Content-type': 'application/json'
      },
    })
    const json = await response.json();
    // console.log(json);
    // filterContent(json.users, searchTerm);
    json.users.map((element, index)=>{
      setSearchedUsers(oldArray => [...oldArray, {key: index, text: element.username}])
      // setSearchedUsers(oldArray => [...oldArray, {key: index, text: element.username}])
      // setSearchedUsers(oldArray => [...oldArray, {key: index, text: element.username}])
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.fundhunting}>
        Fund Hunting
      </div>
      <div className={styles.search}>
        {/* <Input icon="search" placeholder='Search' onChange={changeSearchTerm} /> */}
        <Dropdown
          icon=""
          placeholder='Search'
          fluid
          search
          selection
          // onChange={changeSearchTerm}
          options={searchedUsers}
        />
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
            <Link href={`/profile/${userName}?show=saved`}>
              <Icon size="large" name="bookmark" />
            </Link>
          </li>

          <li>
            <Dropdown className={styles.dropdown} icon={{ name: 'user circle', size: 'large' }}  >
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => { Router.pushRoute(`/profile/${userName}?show=posts`) }}>
                  Your Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={() => { Router.pushRoute(`/profile/${userName}?show=bids`) }} >
                  Bid Placed
                </Dropdown.Item>
                <Dropdown.Item onClick={() => { Router.pushRoute(`/profile/${userName}?show=saved`) }}>
                  Saved
                </Dropdown.Item>

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
