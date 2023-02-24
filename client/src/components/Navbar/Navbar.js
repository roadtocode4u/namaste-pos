import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';

export default function Navbar() {

    return (
        <>
            <nav class="navbar navbar-expand-lg fixed-top navbar-light navbar-light bg-light">
                <a class="navbar-brand" href="/"><b>NamastePos 🙏</b></a>
                <button
                    className="navbar-toggler nav-color"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse navbar-sizing" id="navbarNav" style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">
                                <span className='nav_register nav-color signup-btn'> <i class="fa-solid fa-user-plus"></i> <b>Signup</b></span>
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">
                                <span className='nav_register nav-color login-btn'><i class="fa-solid fa-right-to-bracket"></i> <b>Login</b></span>
                            </Link>
                        </li>
                    </ul>

                </div>
            </nav>
        </>
    )
}
