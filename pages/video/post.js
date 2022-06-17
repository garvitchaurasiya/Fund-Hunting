import React, { useState } from 'react'
import Link from 'next/link';
import styles from '../../styles/post.module.css'
import Navbar from '../../components/Navbar/Navbar'

export default function post() {

    const [file, setFile] = useState("");
    const [state, setState] = useState({
        amount: '',
        equity: ''
    })

    const onChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const onChangeFile = (e) => {
        setFile(e.target.files[0]);
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('file', file);
        const response = await fetch("http://localhost:5000/api/video/upload", {
            method: "POST",
            body: formData
        });
        const json = await response.json();
        console.log(json);

    }

    return (
        <div>
            {/* <form onSubmit={handleOnSubmit} encType="multipart/form-data">
                <input type="file" filename="file" onChange={onChangeFile} />
                <button type='submit'>Upload</button>

                <input type="file" id="styles.actual-btn" hidden />
                <label htmlFor="actual-btn">Choose File</label>


            </form> */}

            <Navbar/>

                <div className={styles.container}  >
                    <div className={styles.shadowBox}>
                        <div className={styles.form}>
                            <div>
                                <h1 className={styles.heading}>
                                    Post
                                </h1>
                                <form onSubmit={handleOnSubmit} encType="multipart/form-data">

                                    <input type="file" filename="file" onChange={onChangeFile} />

                                    <label>Ask</label>
                                    <input type="text" name="amount" className={styles.input} onChange={onChange} placeholder='1.25 Lakh' />
                                    <label>For</label>
                                    <input type="text" name="equity" className={styles.input} onChange={onChange} placeholder='7%' />

                                    <button type='submit' className={styles.button}>Upload</button>


                                </form>
                            </div>
                        </div>
                    </div>
                </div>


        </div>
    )
}
