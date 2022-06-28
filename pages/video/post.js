import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Router from 'next/router';
import styles from '../../styles/post.module.css'
import fundhunting from '../../ethereum/fundhunting';
import web3 from '../../ethereum/web3';
import { Icon } from 'semantic-ui-react';

export default function Post() {

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
    
            const accounts = await web3.eth.getAccounts();
    
            const success = await fundhunting.methods.payVideoUploadingFee().send({
                from: accounts[0],
                value: web3.utils.toWei('0.001', 'ether')
            })
    
            if (success) {
                let formData = new FormData();
    
                formData.append('file', file);
                formData.append('username', localStorage.getItem('username'));
                formData.append('amount', state.amount);
                formData.append('equity', state.equity);
                const response = await fetch("http://localhost:5000/api/video/upload", {
                    method: "POST",
                    body: formData
                }); 
                const json = await response.json();
                console.log(json);
    
                if(json.success){
                    Router.push({ pathname: '/' })
                }
            }
        }


        return (
            <div>
    
                <Navbar />
    
                <div className={styles.container}  >
                    <div className={styles.shadowBox}>
                        <div className={styles.form}>
                            <div>
                                <h1 className={styles.heading}>
                                    Post
                                    <Icon name="user circle" />
                                    
                                </h1>
                                <form onSubmit={handleOnSubmit} encType="multipart/form-data">
    
                                    <input type="file" filename="file" onChange={onChangeFile} />
    
                                    <label>Ask</label>
                                    <input type="text" name="amount" className={styles.input} onChange={onChange} value={state.amount} placeholder='1.25 Lakh' />
                                    <label>For</label>
                                    <input type="text" name="equity" className={styles.input} onChange={onChange} value={state.equity} placeholder='7%' />
    
                                    <button type='submit' className={styles.button}>Upload</button>
    
    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
    
    
            </div>
        )
}


// export default function post() {

//     

    
// }
