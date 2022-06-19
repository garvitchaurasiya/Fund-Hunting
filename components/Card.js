import React, { useState, useEffect } from 'react'
import { Card, Header, Modal, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import modalstyles from '../styles/VideoModal.module.css'
import styles from '../styles/Card.module.css';
import Link from 'next/link'

function Card2(props) {

  const [state, setState] = useState({ amount: "", equity: "" })
  const [displayLikes, setDisplayLikes] = useState(props.likes);
  const [liked, setLiked] = useState("thumbs up outline");

  useEffect(() => {
    isAlreadyLiked();
  }, [])
  
  const isAlreadyLiked = async()=>{
    const response = await fetch("http://localhost:5000/api/video/alreadyliked", {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ filename: props.filename })
      });
      const json = await response.json();
      if(json.isLiked !== null){
        setLiked("thumbs up");
      }
  }

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const toggleLike = async () => {
    setLiked((liked === 'thumbs up outline') ? 'thumbs up' : 'thumbs up outline')

    if (liked === 'thumbs up outline') { // For Like
      const response = await fetch("http://localhost:5000/api/video/like", {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ filename: props.filename })
      });
      const json = await response.json();
      setDisplayLikes(json.likes.length);
    }
    else{
      const response = await fetch("http://localhost:5000/api/video/dislike", {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ filename: props.filename })
      });
      const json = await response.json();
      setDisplayLikes(json.likes.length);
    }


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
    var myDiv = document.getElementById("bidsContainer");
    myDiv.scrollTop = myDiv.scrollHeight + 1000;
  }

  const renderCards = () => {
    const items = bids.map((ele, index) => {
      return {
        key: index,
        header: ele.amount,
        meta: ele.equity,
        description: (
          <Link href='/'>
            <a>{ele.bidplacer}</a>
          </Link>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.videos}>
        <div className={styles.companyName}>
          <Icon size="big" name="user circle" />
          <b>{props.author}</b>
        </div>
        <video className={styles.video} src={`/uploads/${props.filename}`} width="100%" height="590px" controls />
        <div className={styles.actions}>
          <div onClick={toggleLike}>{displayLikes}<Icon name={`${liked}`} /></div>
          <div>Comment</div>
          <div>Share</div>

          <Modal
            className={modalstyles.container}
            trigger={<div onClick={getAllBids}>Ask</div>}
          >
            <Modal.Content className={modalstyles.content} image style={{ "padding": "0", 'height': '100%' }}>
              <video className={modalstyles.video} src={`/uploads/${props.filename}`} controls max-width="400px"></video>
              <Modal.Description className={styles.description}>
                <Header>Place a Bid</Header>
                <p>{props.author} wish to raise <b>Rs. {props.amount}</b> for <b>{props.equity}</b> of equity.</p>
                <h5>Bid Placed</h5>
                <div className={styles.bidsContainer} id="bidsContainer">
                  {renderCards()}
                </div>
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

export default Card2