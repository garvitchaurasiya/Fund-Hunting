import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react';
import Navbar from '../components/Navbar';
import 'semantic-ui-css/semantic.min.css';
import styles from '../styles/Profile.module.css'
import Videos from '../components/Videos';


export class Profile extends Component {

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
                    <div>POSTS</div>
                    <div>SAVED</div>
                    <div>BIDED</div>
                </div>

                <div>
                    <Videos viewingProfile="true" username={this.props.username} />
                </div>

            </div>

        )
    }
}

export default Profile