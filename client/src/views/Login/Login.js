import React, { useState } from "react";
import './Login.css'
import Modal from "react-modal";

Modal.setAppElement("#root");

function Login() {

  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }
  return (
    <>
      <button onClick={toggleModal}>Click</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <form className='form-elements text-center login-form-container'>
          <p className="login-page-heading">Login</p>
          <span onClick={toggleModal} className="loginModal-closeBtn">
            &times;
          </span>
        
          <div className="mb-3">
            <input
              required
              placeholder="Email"
              type="email"
              className="login-form-input"
              id="email"
            />
          </div>

          <div className="mb-3">
            <input
              required
              placeholder="Password"
              type="text"
              className="login-form-input"
              id="password"
            />
          </div>

          <button type="button" className="login-page-btn">
            <b>Login</b>
          </button>
        </form>
      </Modal>
    </>
  )
}

export default Login