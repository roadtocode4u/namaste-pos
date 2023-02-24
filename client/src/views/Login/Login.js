import React from "react";
import './Login.css'
import Modal from "react-modal";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

function Login(props) {

  return (
    <>
      <Modal
        isOpen={props.isLoginOpen}
        onRequestClose={props.toggleModalLogin}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <form className='form-elements text-center login-form-container'>
          <p className="login-page-heading">Login</p>
          <Link to="/">
            <span onClick={props.toggleModalLogin} className="loginModal-closeBtn">
              &times;
            </span>
          </Link>

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
            <b><i class="fa-solid fa-right-to-bracket"></i> Login</b>
          </button>
        </form>
      </Modal>
    </>
  )
}

export default Login