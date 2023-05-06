import React from 'react'


const Contact = () => {
    const address = "Kedem St 91, Tel Aviv-Yafo";
    const encodedAddress = encodeURIComponent(address);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    return (
        <div>
            <br/>
            <h2 style={{display: 'inline-block'}}>Reach Us</h2><div style={{fontSize: '8px', display: 'inline-block'}}>(dont)</div>
            <br/>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                Open in Google Maps
            </a>
        
        </div>
    )
}

export default Contact