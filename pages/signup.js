import React, { useState } from 'react'
import styles from '../styles/Login.module.css'
import Link from 'next/link';
import Router from 'next/router';

export default function signup() {

    // let navigate = useNavigate();

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
    // let navigate1 = useNavigate();
    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createaccount", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },

            body: JSON.stringify({ name, email, password })

        });
        console.log(email, password);
        const json = await response.json();
        if (json.success) {
            // Save the auth Token and redirect
            localStorage.setItem('token', json.authToken);
            // navigate1('/enterotp', {state:{email}});
            Router.push({pathname: '/'})

        }
        else {
            alert('An account already exist with this email.');
        }
        console.log(json);
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value }); // This took 2 hours. Don't put [] over e.target.value.
    }

    return (
        <>
            <div>
                <div id={styles.login2_signup}  >
                    <div id={styles.details_login}>
                        <div>
                            <h1 className={styles.login2_heading}>Hello!</h1>
                            <p className={styles.login2_para}>
                                Enter your personal details and start your job journey with us
                            </p>
                        </div>
                    </div>
                    <div id={styles.login_form}>
                        <div>
                            <h1 className={styles.login2_heading}>
                                Sign Up
                            </h1>
                            <form onSubmit={handleSignup}>
                                <input type="text" name="name" className={styles.login2_input} onChange={onChange} placeholder='Name' />
                                <input type="email" name="email" className={styles.login2_input} onChange={onChange} placeholder='Email' />
                                <input type="password" name="password" className={styles.login2_input} onChange={onChange} placeholder='Password' />

                                <button className={styles.login2_button}>SIGN UP</button>
                                <p className={styles.login2_tell}>
                                    <Link href="/login">Already have a Account on NorthFlex?</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}