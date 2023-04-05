import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Signup from './../../views/Signup/Signup';
import Login from '../../views/Login/Login';
import Shopping from './shoppingcart.png';
import { myProductListCount } from '../../utils/myListItem';

export default function Navbar() {
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);

  const [myListItem, setMyListItem] = useState(myProductListCount);

  function closePopupSignup() {
    setIsSignupPopupOpen(false);
  }

  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  function closePopupLogin() {
    setIsLoginPopupOpen(false);
  }

  useEffect(() => {
    setMyListItem(myProductListCount);
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top navbar-light navbar-light bg-light">
        <a className="navbar-brand" href="/">
          <h4 className="namaste-pas-heading-h1">
            <b>NamastePos🙏</b>
          </h4>
        </a>
        <div>
          <Link to="/myProductList" className="text-decoration-none">
            <button type="button" className="position-relative">
              <img
                className="shopping-card"
                src={Shopping}
                alt="shopping card"
              />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {myListItem}
              </span>
            </button>
          </Link>
        </div>

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
