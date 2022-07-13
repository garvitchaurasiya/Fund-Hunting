import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react';
import Navbar from '../components/Navbar';
import 'semantic-ui-css/semantic.min.css';
import styles from '../styles/Profile.module.css'
import Videos from '../components/Videos';
import Saved from '../components/Saved';


export class Profile extends Component {

    state = {
        show: "saved"
    }

    static async getInitialProps(props) {

        const username = props.query.username;

        const response = await fetch("http://localhost:5000/api/auth/getuser", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },

            body: JSON.stringify({ username })

        });
        const json = await response.json();

        return {
            username: json.user.username,
            email: json.user.email,
            mobileNumber: json.user.mobileNumber
        }
    }

    componentDidMount(){
        console.log(this.state);
        this.state.show = "posts"
    }
    a=()=>{
        console.log("HI")
        this.setState({
            show: "posts"
        })
        console.log(this.state)
    }

    render() {
        return (
            <div style={{ "backgroundColor": "#f3f2ef" }}>
                <Navbar />
                <div className={styles.hero_section}>
                    <div>
                        <Icon name="user circle" size="massive" />
                    </div>
                    <h2>{this.props.username}</h2>
                    <hr />
                </div>
                <div className={styles.options}>
                    <div onClick={this.a}>POSTS</div>
                    <div onClick={()=>{this.setState({show: "saved"})}}>SAVED</div>
                    <div onClick={()=>{this.setState({show: "bids"})}}>BIDS</div>
                </div>

                <div hidden={(this.state.show==="posts")?false:true}>
                    <Videos viewingProfile="true" username={this.props.username} />
                </div>
                <div hidden={(this.state.show==="saved")?false:true}>
                    <Saved/>
                </div>
                <div hidden={(this.state.show==="bids")?false:true}>
                    {/* <Videos viewingProfile="true" username={this.props.username} /> */}
                    Bids
                </div>

            </div>

        )
    }
}

export default Profile