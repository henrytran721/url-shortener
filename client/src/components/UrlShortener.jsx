import React, { useState, useEffect } from 'react';
import '../styles/urlshortener.scss';
import {debounce} from '../debounce';

export const UrlShortener = () => {
    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('')

    async function sendUrl() {
        console.log(url);
        if(url.length > 0) {
            // send url data to our backend
            const response = await fetch('http://localhost:8080/url-shorten', {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({url})
            })

            const body = await response.json();
            setShortUrl(body.shortUrl);
            setUrl('');
        }
    }

    return (
        <>
        <div className='shortenDiv'>
            <h1>Url Shortener</h1>
            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder='Please Enter Url'/>
            <button className='shortenBtn' onClick={debounce(sendUrl, 200)}>Shorten</button>
        </div>
        <a href={shortUrl}>{shortUrl}</a>
        </>
    )
}


// http://localhost:8080/v/T733O-myD
