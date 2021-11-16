import { startSession } from 'mongoose';
import React, { useEffect, useState } from 'react';
import {debounce} from '../debounce';
import { StatTable } from './StatTable';

export const UrlStats = () => {
    const [url, setUrl] = useState('');
    const [stats, setStats] = useState({});

    useEffect(() => {
        console.log(Object.keys(stats).length);
    }, [])

    async function getStats() {
        let shortcode = url.split('/');
        shortcode = shortcode[shortcode.length - 1];
        if(url.length > 0) {
            const response = await fetch('http://localhost:8080/getstats', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({url: shortcode})
            })
            const data = await response.json();
            console.log(data);
            setStats(data);
            setUrl('');
        }
    }

    return (
        <>
         <p>Please enter the Url of the link you want stats from</p>
         <input type="text" placeholder='Url of Stats' onChange={(e) => setUrl(e.target.value)} value={url} />
         <button onClick={debounce(getStats, 200)}>Track Stats</button>
         {stats.clickCount ? <StatTable stats={stats} /> : <p>{stats.message}</p> }
        </>
    )
}