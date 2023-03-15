import React, { useState } from 'react';
import './Navbar.css';
import Signup from './../../views/Signup/Signup';
import Login from '../../views/Login/Login';

export default function Navbar() {
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);

  function closePopupSignup() {
    setIsSignupPopupOpen(false);
  }

  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  function closePopupLogin() {
    setIsLoginPopupOpen(false);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top navbar-light navbar-light bg-light">
        <a className="navbar-brand" href="/">
          <h4 className="namaste-pas-heading-h1">
            <b>NamastePos🙏</b>
          </h4>
        </a>
        <button
          className="navbar-toggler nav-color"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse navbar-sizing"
          id="navbarNav"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <span
                className="nav_register nav-color login-btn"
                onClick={() => {
                  setIsLoginPopupOpen(true);
                }}>
                <i className="fa-solid fa-right-to-bracket"></i>
                <b> Login</b>
              </span>

              <span
                className="nav_register nav-color signup-btn"
                onClick={() => {
                  setIsSignupPopupOpen(true);
                }}>
                <i className="fa-solid fa-user-plus"></i>
                <b> Signup</b>
              </span>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item"></li>
          </ul>
        </div>
      </nav>
      <Signup isOpen={isSignupPopupOpen} closePopupSignup={closePopupSignup} />
      <Login isOpen={isLoginPopupOpen} closePopupLogin={closePopupLogin} />
    </>
  );
}
