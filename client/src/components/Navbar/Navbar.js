import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Shopping from './shoppingcart.png';
import QRCocde from './qr-code.png';
import './Navbar.css';
import './../../style/button.css';
import Signup from './../../views/Signup/Signup';
import Login from '../../views/Login/Login';
import { myProductListCount } from '../../utils/myListItem';
import { currentUser } from './../../utils/auth';

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

  function logOut() {
    localStorage.removeItem('currentUser');
    window.location.href = '/';
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top navbar-light navbar-light bg-light">
        <h3 className="navbar-brand navbar-heading" href="/">
          NamstePOS
        </h3>
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
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="homepage-route" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item mt-2">
              <Link className="homepage-route" to="/scanner">
                <img style={{ width: '32px' }} src={QRCocde} />
              </Link>
            </li>
          </ul>
        </div>
        <div
          className="collapse navbar-collapse navbar-sizing"
          id="navbarNav"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <div className="shopping-conatiner">
            {currentUser && (
              <Link to="/myProductList" className="text-decoration-none">
                <button type="button" className="position-relative cart-btn">
                  <img
                    className="shopping-cart"
                    src={Shopping}
                    alt="shopping cart"
                  />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {myListItem}
                  </span>
                </button>
              </Link>
            )}
          </div>
          <div className="profile-container mt-3">
            {currentUser && (
              <div>
                <Link
                  className="profile-link-tag"
                  to={`/order/${currentUser._id}`}>
                  <p className="current-user-name">{currentUser.fullName}</p>
                </Link>
              </div>
            )}
          </div>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {currentUser && (
                <Link className="nav-link">
                  <span className="loggout-span" onClick={logOut}>
                    Logout
                  </span>
                </Link>
              )}
            </li>
          </ul>
          <div className="nav-item login-btn">
            {!currentUser && (
              <span
                className="nav_register nav-color login-btn"
                onClick={() => {
                  setIsLoginPopupOpen(true);
                }}>
                Login
              </span>
            )}
          </div>
          <div className="nav-item signup-btn">
            {!currentUser && (
              <span
                className="nav_register nav-color signup-btn"
                onClick={() => {
                  setIsSignupPopupOpen(true);
                }}>
                Signup
              </span>
            )}
          </div>
        </div>
      </nav>
      <Signup isOpen={isSignupPopupOpen} closePopupSignup={closePopupSignup} />
      <Login isOpen={isLoginPopupOpen} closePopupLogin={closePopupLogin} />
    </>
  );
}
