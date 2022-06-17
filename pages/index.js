import React, { useState, useEffect } from 'react'

import Navbar from '../components/Navbar'
import Card from "../components/Card"
import styles from "../styles/Home.module.css";

export default function Home() {

  const [allVideos, setAllVideos] = useState([]);
  const allvideos = [];

  const getAllVideos = async () => {
    const response = await fetch("http://localhost:5000/api/video/getvideos", {
      method: "GET",
      headers: {
        'Content-type': 'application/json'
      }

    });
    const json = await response.json();
    setAllVideos(json);

  }

  useEffect(() => {

    getAllVideos();

  }, []);

  return (
    <div style={{"backgroundColor":"#fafafa"}}>
      <Navbar />

      <div className={styles.renderCards}>
        {
          allVideos.map((element, index) => {
            return <Card filename={element.filename} author={element.author} />
          })
        }
      </div>

    </div>
  )
}
