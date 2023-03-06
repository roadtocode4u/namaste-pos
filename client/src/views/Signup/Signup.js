import React from 'react';
import './Signup.css';

function Signup({ isOpen, closePopup }) {
  return (
    <>
      <div
        id="signup-main-container"
        className="signup-page"
        style={{ display: isOpen ? 'block' : 'none' }}>
        <div className="page-content">
          <span className="close" onClick={closePopup}>
            &times;
          </span>
          <h2 className="text-center mb-3">Sign Up</h2>
          <div className="text-center">
            <form>
              <div className="mb-3">
                <input
                  required
                  placeholder="Full Name"
                  type="text"
                  className="signup-form-input"
                  id="name"
                />
              </div>

              <div className="mb-3">
                <input
                  required
                  placeholder="Email"
                  type="email"
                  className="signup-form-input"
                  id="email"
                />
              </div>

              <div className="mb-3">
                <input
                  required
                  placeholder="Phone"
                  type="text"
                  className="signup-form-input"
                  id="phone"
                />
              </div>

              <div className="mb-3">
                <input
                  required
                  placeholder="Password"
                  type="password"
                  className="signup-form-input"
                  id="password"
                />
              </div>

              <button type="button" className="signup-page-btn">
                <b>
                  <i className="fa-solid fa-user-plus"></i> Sign Up
                </b>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
