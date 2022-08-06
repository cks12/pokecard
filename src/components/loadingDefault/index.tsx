import React from "react";
import './styles.css'

const Loading = () => {
    return <div className="loading">
    <div className="lds-grid">
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        
        </div>
        <p>Loading....</p>
    </div>
}

export default Loading