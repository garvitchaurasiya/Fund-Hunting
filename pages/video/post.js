import React, { useState } from 'react'

export default function post() {
    
    const [file, setFile] = useState("");

    const onChangeFile = (e)=>{
        setFile(e.target.files[0]);
    }

    const choosenFile = async (e)=>{
        e.preventDefault();

        let formData = new FormData();
        // const config = {
        //     header: { 'content-type': 'multipart/form-data' }
        // }
        formData.append('file', file);

        const response = await fetch("http://localhost:5000/api/upload/video", {
            method: "POST",
            
            body: formData
        });
        const json = await response.json();
        console.log(json);

    }

    return (
        <div>
            <form onSubmit={choosenFile} encType="multipart/form-data">
                <input type="file" filename="file" onChange={onChangeFile}/>
                <button type='submit'>Upload</button>
            </form>
        </div>
    )
}
