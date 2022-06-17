import React from 'react'
import styles from '../styles/Card.module.css';


function Card(props) {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.companyName}>
          {props.author}
        </div>
        <video className={styles.video} src={`/uploads/${props.filename}`} width="100%" height="390px" controls />
        <div className={styles.actions}>
          <div>Like</div>
          <div>Commennt</div>
          <div>Share</div>
          <div>Bid</div>
        </div>
      </div>
    </div>
  )
}

export default Card