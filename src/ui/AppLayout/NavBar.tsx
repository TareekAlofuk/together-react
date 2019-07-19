import * as React from "react";
import {useState} from "react";
import {Link} from "react-router-dom";

export default function NavBar() {
    const [selected, select] = useState('');
    return <div className="nav">

        <div className={`nav-item ${selected === 'home' ? 'selected' : ''}`}>
            <Link to="/members" onClick={() => select('home')}>HOME</Link>
        </div>


        <div className={`nav-item ${selected === 'item1' ? 'selected' : ''}`}>
            <Link to="/1" onClick={() => select('item1')}>ITEM 1</Link>
        </div>
        <div className={`nav-item ${selected === 'item2' ? 'selected' : ''}`}>
            <Link to="/2" onClick={() => select('item2')}>ITEM 2</Link>
        </div>
        <div className={`nav-item ${selected === 'item3' ? 'selected' : ''}`}>
            <Link to="/3" onClick={() => select('item3')}>ITEM 3</Link>
        </div>
    </div>
}