import * as React from 'react'
import "./styles.css";
import NavBar from './NavBar';

export default class AppBar extends React.Component {
    render() {
        return (
            <div id="app-bar">
                <div className="logo">
                    <img src="/images/logo.png"/>
                    <span style={{color: '#FFFF'}}>Together</span>
                </div>
                <NavBar/>
                <div className="actions"></div>
            </div>
        )
    }
}
