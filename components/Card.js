import React, { useState } from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import modalstyles from '../styles/VideoModal.module.css'
import styles from '../styles/Card.module.css';

function Card(props) {

  const [state, setState] = useState({ amount: "", equity: "" })
  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const [bids, setBids] = useState([]);

  const getAllBids = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/video/getbids", {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ filename: props.filename })

    });
    const json = await response.json();
    setBids(json.bids);
    console.log(state, json);
    // if (json.success) {
    //   // Save the auth Token and redirect
    //   localStorage.setItem('token', json.authToken);
    //   localStorage.setItem('user', json.user);
    //   // navigate('/');
    //   Router.push({ pathname: '/' })
    // }
    // else {
    //   alert('Please enter the valid credentials');
    // }
  }

  const placeNewBid = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/video/placebid", {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ filename: props.filename, bidamount: state.amount, bidequity: state.equity })

    });
    const json = await response.json();
    setBids(json.bids);
  }

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
            trigger={<div onClick={getAllBids}>Ask</div>}
          >
            <Modal.Content className={modalstyles.content} image style={{ "padding": "0", 'height': '100%' }}>
              <video className={modalstyles.video} src={`/uploads/${props.filename}`} controls max-width="400px"></video>
              <Modal.Description>
                <Header>Place a Bid</Header>
                <p>{props.author} wish to raise <b>Rs. {props.amount}</b> for <b>{props.equity}</b> of equity.</p>
                <h5>Bid Placed</h5>
                {
                  bids.map((ele, index) => {
                    return <p key={index}>{ele.amount} for {ele.equity} by {ele.bidplacer}</p>
                  })
                }
                <Modal.Actions>
                  <form className={styles.placeBid} onSubmit={placeNewBid}>
                    <input onChange={onChange} name="amount" value={state.amount} placeholder='amount' />
                    <input onChange={onChange} name="equity" value={state.equity} placeholder='equity' />
                    <button type="submit">Place Bid</button>
                  </form>
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