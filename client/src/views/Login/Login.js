import React, { useState } from 'react';
import axios from 'axios';

import './Login.css';
import swal from 'sweetalert';
import Loader from '../../components/Loader/Loader';

function Login({ isOpen, closePopupLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function loginUser() {
    setIsLoading(true);
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
    setIsLoading(false);

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
      <Loader isLoading={isLoading} />
    </>
  );
}

export default Login;
