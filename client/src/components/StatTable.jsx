import React, { useState } from 'react';
import '../styles/table.scss';

export const StatTable = (props) => {
    const { stats } = props;
    return (
        <>
            <table>
                <tr>
                <th>Original Url</th>
                <th>Short Url</th>
                <th>Click Count</th>
                </tr>
                <tr>
                    <td>{stats.originalUrl}</td>
                    <td>{stats.shortUrl}</td>
                    <td>{stats.clickCount}</td>
                </tr>
            </table>
        </>
    )
}