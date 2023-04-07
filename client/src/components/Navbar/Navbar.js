import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Shopping from './shoppingcart.png';
import UserImage from './userimage.png';
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
          <div>
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
          </div>
          <div className="profile-container">
            {currentUser && (
              <div className="text-center mt-3">
                <Link
                  className="profile-link-tag"
                  to={`/order/${currentUser._id}`}>
                  <img className="user-profile-img" src={UserImage} />
                  <p>{currentUser.fullName}</p>
                </Link>
              </div>
            )}
          </div>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {currentUser && (
                <Link className="nav-link" to="/">
                  <button type="button" className="logout-btn" onClick={logOut}>
                    <i className="fa-solid fa-right-from-bracket"></i>{' '}
                    <b> Logout</b>
                  </button>
                </Link>
              )}
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {!currentUser && (
                <span
                  className="nav_register nav-color login-btn"
                  onClick={() => {
                    setIsLoginPopupOpen(true);
                  }}>
                  <i className="fa-solid fa-right-to-bracket ms-3"></i>
                  <b> Login</b>
                </span>
              )}

              {!currentUser && (
                <span
                  className="nav_register nav-color signup-btn"
                  onClick={() => {
                    setIsSignupPopupOpen(true);
                  }}>
                  <i className="fa-solid fa-user-plus"></i>
                  <b> Signup</b>
                </span>
              )}
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
