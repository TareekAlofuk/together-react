import * as React from 'react'
import "./styles.css";
import { Link } from 'react-router-dom';
import NavBar from './NavBar';

export default class AppBar extends React.Component {
    render() {
        return (
            <div id="app-bar">
                <div className="logo">
                    <img src="/images/logo.jpg" />
                    <span>Together</span>
                </div>
                <NavBar />
                <div className="actions"></div>
            </div>
        )
    }
}
