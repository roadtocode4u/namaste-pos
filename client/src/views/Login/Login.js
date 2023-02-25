import React, { useState } from "react";
import './Login.css'
import Modal from "react-modal";
import axios from 'axios';
import swal from "sweetalert";


Modal.setAppElement('#root');

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function addUser() {
    const response = await axios.post('/login', {
      email,
      password
    })

    if (response.data.success) {
      await swal({
        title: "Login Successfully !!",
        text: response.data.message,
        icon: "success",
        button: "Aww yiss!",
      });

      window.location.href = '/'

    }

    else {
      await swal({
        title: "Error",
        text: response.data.message,
        icon: "error",
        button: "😥",
      });
    }

    setEmail("");
    setPassword("");
 
  }


  return (
    <>
      <Modal
        isOpen={props.isLoginOpen}
        onRequestClose={props.toggleModalLogin}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}>
        <form className="form-elements text-center login-form-container">
          <p className="login-page-heading">Login</p>
          <span
            onClick={props.toggleModalLogin}
            className="loginModal-closeBtn">
            &times;
          </span>

          <div className="mb-3">
            <input
              required
              placeholder="Email"
              type="email"
              className="login-form-input"
              id="email"
              value={email} onChange={(e) => { setEmail(e.target.value) }}
            />
          </div>

          <div className="mb-3">
            <input
              required
              placeholder="Password"
              type="password"
              className="login-form-input"
              id="password"
              value={password} onChange={(e) => { setPassword(e.target.value) }}
            />
          </div>


          <button type="button" className="login-page-btn" onClick={addUser}>
            <b><i class="fa-solid fa-right-to-bracket"></i> Login</b>
          </button>
        </form>
      </Modal>
    </>
  );
}

export default Login;
