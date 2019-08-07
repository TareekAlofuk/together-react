import * as React from "react";
import {useState} from "react";
import {Link} from "react-router-dom";
import SessionManager from "../../shared/utils/SessionManager";
import {Button} from "semantic-ui-react";

export default function NavBar() {
    const [selected, select] = useState(SessionManager.isAdmin() ? 'home' : '');
    return <div className="nav">

        <div className={`nav-item ${selected === 'home' ? 'selected' : ''}`}>
            {
                SessionManager.isAdmin() ?
                    <Link to="/members" onClick={() => select('home')}>HOME</Link>
                    :
                    <a style={{color: '#777'}}>HOME</a>
            }
        </div>


        <div className={`nav-item ${selected === 'services' ? 'selected' : ''}`}>
            {
                SessionManager.isAdmin() || SessionManager.isControl() ?
                    <Link to="/services" onClick={() => select('services')}>SERVICES</Link>
                    :
                    <a style={{color: '#777'}}>SERVICES</a>
            }
        </div>
        <div className={`nav-item ${selected === 'wallet' ? 'selected' : ''}`}>
            {
                SessionManager.isAdmin() || SessionManager.isAccountant() ?
                    <Link to="/wallet" onClick={() => select('wallet')}>WALLET</Link>
                    :
                    <a style={{color: '#777'}}>WALLET</a>
            }
        </div>
        <div className={`nav-item`}>
            <Link to={`/logout`} onClick={() => {
                SessionManager.logout();
                window.location.href = '/';
            }}>LOGOUT</Link>
        </div>
    </div>
}