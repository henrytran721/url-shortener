import React, { useState } from 'react';
import '../styles/navigation.scss';

export const Navigation = () => {
    return (
        <>
            <ul>
                <a href="/"><li>Url Shortener</li></a>
                <a href='/stats'><li>Url Stats</li></a>
            </ul>
        </>
    )
}