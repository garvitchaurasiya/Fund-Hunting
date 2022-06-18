import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import modalstyles from '../styles/VideoModal.module.css'
import styles from '../styles/Card.module.css';

function Card(props) {

  // const onClickAsk = () => {

  //   document.getElementById("modal").click();


  // }

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.companyName}>
          {props.author}
        </div>
        <video className={styles.video} src={`/uploads/${props.filename}`} width="100%" height="390px" controls />
        <div className={styles.actions}>
          <div>Like</div>
          <div>Comment</div>
          <div>Share</div>
          {/* <div onClick={onClickAsk}>Ask</div> */}
          <Modal

            className={modalstyles.container}
            trigger={<div>Ask</div>}
          >
            <Modal.Content className={modalstyles.content} image style={{ "padding": "0", 'height': '100%' }}>
              <video className={modalstyles.video} src={`/uploads/${props.filename}`} controls max-width="400px"></video>
              <Modal.Description>
                <Header>Default Profile Image</Header>
                <p>
                  We've found the following gravatar image associated with your e-mail
                  address.
                </p>
                <p>Is it okay to use this photo?</p>
                <Modal.Actions>
              <Button color='black' onClick={() => setOpen(false)}>
                Nope
              </Button>
              <Button
                content="Yep, that's me"
                labelPosition='right'
                icon='checkmark'
                onClick={() => setOpen(false)}
                positive
              />
            </Modal.Actions>
              </Modal.Description>
            </Modal.Content>
            
          </Modal>
        </div>
      </div>

    </div>
  )
}

export default Card