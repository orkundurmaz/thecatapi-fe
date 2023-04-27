import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../../assets/media/logo/roi-ai-logo.png"

const AppHeader = () => {
    return (
        <header className='app-header'>
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="company-logo" />
                    <i className="fa-solid fa-cat"></i>
                </Link>
            </div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader