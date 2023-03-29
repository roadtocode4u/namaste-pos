import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import swal from 'sweetalert';

function Login({ isOpen, closePopupLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser() {
    const response = await axios.post('/login', {
      email,
      password,
    });

    if (response.data.success) {
      localStorage.setItem('currentUser', JSON.stringify(response.data.data));
      await swal({
        title: 'Login Successfully !!',
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

    setEmail('');
    setPassword('');
  }

  return (
    <>
      <div
        id="login-main-container"
        className="login-page"
        style={{ display: isOpen ? 'block' : 'none' }}>
        <div className="page-content">
          <span className="close" onClick={closePopupLogin}>
            &times;
          </span>
          <h2 className="text-center mb-3">Login</h2>
          <div className="text-center">
            <form>
              <div className="mb-3">
                <input
                  required
                  placeholder="Email"
                  type="email"
                  className="login-form-input"
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
                  placeholder="Password"
                  type="password"
                  className="login-form-input"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>

              <button
                type="button"
                className="login-page-btn"
                onClick={loginUser}>
                <b>
                  <i className="fa-solid fa-user-plus"></i> Login
                </b>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
