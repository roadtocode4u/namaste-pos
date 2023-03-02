import React, { useState } from 'react';
import './Signup.css';
import Modal from 'react-modal';
import axios from 'axios';
import swal from 'sweetalert';

Modal.setAppElement('#root');

function Signup(props) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  async function addUser() {
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
  }

  return (
    <>
      <Modal
        isOpen={props.isSignupOpen}
        onRequestClose={props.toggleModalSignup}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}>
        <form className="form-elements text-center signup-form-container">
          <p className="signup-page-heading">Sign up</p>

          <span
            onClick={props.toggleModalSignup}
            className="signupModal-closeBtn">
            &times;
          </span>

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

          <button type="button" className="signup-page-btn" onClick={addUser}>
            <b>
              <i class="fa-solid fa-user-plus"></i> Sign Up
            </b>
          </button>
        </form>
      </Modal>
    </>
  );
}

export default Signup;
