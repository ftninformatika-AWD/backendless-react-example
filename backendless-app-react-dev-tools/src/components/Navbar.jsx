import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.scss'; 

const Navbar = () => {
    return (
        <nav className="navbar-container">
            <ul className="navbar-links">
                <li className="navbar-item">
                    <Link to="/users" className="navbar-link">Users</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/posts" className="navbar-link">Posts</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;