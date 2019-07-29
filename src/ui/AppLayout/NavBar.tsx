import * as React from "react";
import {useState} from "react";
import {Link} from "react-router-dom";

export default function NavBar() {
    const [selected, select] = useState('home');
    return <div className="nav">

        <div className={`nav-item ${selected === 'home' ? 'selected' : ''}`}>
            <Link to="/members" onClick={() => select('home')}>HOME</Link>
        </div>


        <div className={`nav-item ${selected === 'services' ? 'selected' : ''}`}>
            <Link to="/services" onClick={() => select('services')}>Services</Link>
        </div>
        <div className={`nav-item ${selected === 'wallet' ? 'selected' : ''}`}>
            <Link to="/3" onClick={() => select('wallet')}>Wallet</Link>
        </div>
        <div className={`nav-item ${selected === 'users' ? 'selected' : ''}`}>
            <Link to="/1" onClick={() => select('users')}>Users</Link>
        </div>
    </div>
}