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
    window.location.href = '/login';
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
        <div className="container-fluid">
          NamastePOS
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item mt-2">
                <Link className="homepage-route" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item mt-2">
                <Link className="homepage-route" to="/scanner">
                  <img style={{ width: '32px' }} src={QRCocde} />
                </Link>
              </li>
              <li className="nav-item mt-2">
                <div className="profile-container">
                  {currentUser && (
                    <div className="">
                      <Link
                        className="profile-link-tag"
                        to={`/order/${currentUser._id}`}>
                        <p className="current-user-name">
                          {currentUser.fullName}
                        </p>
                      </Link>
                    </div>
                  )}
                </div>
              </li>
              <li className="nav-item">
                <div className="shopping-conatiner">
                  {currentUser && (
                    <Link to="/myProductList" className="text-decoration-none">
                      <button
                        type="button"
                        className="position-relative cart-btn">
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
              </li>
              <li className="nav-item">
                {currentUser && (
                  <Link className="nav-link">
                    <span className="loggout-span" onClick={logOut}>
                      Logout
                    </span>
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {!currentUser && (
                  <span
                    className="nav_register nav-color login-btn m-3"
                    onClick={() => {
                      setIsLoginPopupOpen(true);
                    }}>
                    Login
                  </span>
                )}
              </li>
              <li className="nav-item">
                {!currentUser && (
                  <span
                    className="nav_register nav-color signup-btn m-3"
                    onClick={() => {
                      setIsSignupPopupOpen(true);
                    }}>
                    Signup
                  </span>
                )}
              </li>
            </ul>
            <div className="d-flex"></div>
          </div>
        </div>
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"></div>
      </nav>
      <Signup isOpen={isSignupPopupOpen} closePopupSignup={closePopupSignup} />
      <Login isOpen={isLoginPopupOpen} closePopupLogin={closePopupLogin} />
    </>
  );
}
