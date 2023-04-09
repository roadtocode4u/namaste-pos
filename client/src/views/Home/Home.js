import React from 'react';

import { Link } from 'react-router-dom';

import './Home.css';

import { pendingBooking } from '../../utils/auth';

function Home() {
  return (
    <>
      <div className="main-div">
        <div className="container-fluid">
          <div className="row">
            <div className="text-center">
              <div className="text-center namstePOS-container">
                <h1 className="namastePOS-heading">NamastePOS</h1>
              </div>
              <h1 className="homepage-heading">
                WORK TOGETHER, <br />
                EAT TOGETHER
              </h1>
              <Link to="/menu">
                <button className="order-btn me-5">Menu</button>
              </Link>

              {pendingBooking ? (
                <Link to={`${pendingBooking}`}>
                  <button className="order-btn">Book Table</button>
                </Link>
              ) : (
                <Link to="/bookTable">
                  <button className="order-btn">Book Table</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
