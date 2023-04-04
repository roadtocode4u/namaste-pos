import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

import Loader from './../../components/Loader/Loader';
import './Signup.css';
import './../../style/button.css';

function Signup({ isOpen, closePopupSignup }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function addUser() {
    setIsLoading(true);
    const response = await axios.post('/signup', {
      fullName,
      email,
      password,
      phone,
    });

    if (response.data.success) {
      await swal({
        title: 'Signup Successfully !!',
        text: response.data.message,
        icon: 'success',
        button: 'Aww yiss!',
      });

      window.location.href = '/';
    } else {
      await swal({
        title: 'Error',
        text: response.data.message,
        icon: 'error',
        button: '😥',
      });
    }

    setFullName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setIsLoading(false);
  }

  return (
    <>
      <div
        id="signup-main-container"
        className="signup-page"
        style={{ display: isOpen ? 'block' : 'none' }}>
        <div className="page-content">
          <span className="close" onClick={closePopupSignup}>
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
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <input
                  required
                  placeholder="Email"
                  type="email"
                  className="signup-form-input"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <input
                  required
                  placeholder="Phone"
                  type="text"
                  className="signup-form-input"
                  id="phone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <input
                  required
                  placeholder="Password"
                  type="password"
                  className="signup-form-input"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>

              <button type="button" className="auth-page-btn" onClick={addUser}>
                <b>
                  <i className="fa-solid fa-user-plus"></i> Sign Up
                </b>
              </button>
            </form>
          </div>
        </div>
        <Loader isLoading={isLoading} />
      </div>
    </>
  );
}

export default Signup;
