import React, { useState, useEffect } from 'react'

import Card2 from "./Card"
import styles from "../styles/Home.module.css"

export default function Videos() {

  const [allVideos, setAllVideos] = useState([]);

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

  const getLikes = async (filename) => {
    const response = await fetch("http://localhost:5000/api/video/getlikes", {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ filename })
    });
    const json = await response.json();

    // setLikes(json);
    console.log(json.likes);

  }

  return (
    <div>
      <div className={styles.renderCards}>
        {
          allVideos.map((element, index) => {
            return <Card2 key={index} filename={element.filename} author={element.author} amount={element.amount} equity={element.equity} likes={element.likes.length}/>
          })
        }
      </div>

    </div>
  )
}
