import React, { useState, useEffect } from 'react'
import Card2 from '../components/Card';
import Navbar from '../components/Navbar'

export default function Home() {

    const [allVideos, setAllVideos] = useState([]);

    const getSavedVideos = async () => {
        const response = await fetch("http://localhost:5000/api/video/saved", {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }

        });
        const json = await response.json();
        console.log(json.saved);
        setAllVideos(json.saved);

    }

    useEffect(() => {
        getSavedVideos();

    }, []);

    return (
        <div>
            <Navbar />
            {
                allVideos.map((element, index) => {
                    return <Card2 key={index} filename={element.filename} author={element.author} amount={element.amount} equity={element.equity} likes={element.likes.length}/>
                })
            }
        </div>
    )
}
