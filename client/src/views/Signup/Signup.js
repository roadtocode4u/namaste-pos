import React, { useState } from "react";
import './Signup.css'
import Modal from "react-modal";

Modal.setAppElement("#root");

function Signup() {

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
        <form className='form-elements text-center signup-form-container'>
          <p className="signup-page-heading">Sign up</p>
          <span onClick={toggleModal} className="signupModal-closeBtn">
            &times;
          </span>
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
              placeholder="Password"
              type="text"
              className="signup-form-input"
              id="phone"
            />
          </div>

          <div className="mb-3">
            <input
              required
              placeholder="Phone"
              type="password"
              className="signup-form-input"
              id="passwrod"
            />
          </div>

          <button type="button" className="signup-page-btn">
            <b><i class="fa-solid fa-user-plus"></i> Sign Up</b>
          </button>
        </form>
      </Modal>
    </>
  )
}

export default Signup