import React, { Component } from 'react'
import Card2 from './Card';
import styles from '../styles/Saved.module.css'


export class PlacedBids extends Component {

    state = {
        allBids: [],
        allVideos: []
    };

    componentDidMount = ()=>{
        this.getPlacedBids();
    }

    getPlacedBids = async () => {
        const response = await fetch("http://localhost:5000/api/auth/getplacedbids", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();

        this.setState({allBids: json.placedBids}, ()=>{
            this.state.allBids.map( async(e, index) => {
                const response = await fetch("http://localhost:5000/api/video/getpostbyname", {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({ filename: e })
                });
                const json = await response.json();
                
                this.setState({ allVideos: [...this.state.allVideos, json] }, ()=>{
                    console.log("yes", json);
                    console.log("callback", this.state.allVideos);
                })

            })
        });
    }

    render() {
        return (
            <div className={styles.container}>
                {this.state.allVideos.map((element, index) => {
                    return <Card2 key={index} filename={element.filename} author={element.author} amount={element.amount} equity={element.equity} likes={element.likes.length} />
                })}
            </div>
        )
    }
}

export default PlacedBids