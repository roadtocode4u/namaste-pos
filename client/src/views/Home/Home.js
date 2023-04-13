import React from 'react';
import { Link } from 'react-router-dom';

import './Home.css';
import { pendingBooking } from '../../utils/auth';
import HomePage from './background-img.jpg';

function Home() {
  return (
    <>
      <div className="main-div">
        <div className="container-fluid">
          <div className="row">
            <h3 className="text-center namastePOS-heading">NamastePOS</h3>
            <div className="col-md-6">
              <div className="text-center">
                <img className="home-page-img" src={HomePage} />
              </div>
            </div>
            <div className="col-md-6 item mt-5">
              <h4 className="text-center homepage-heading mt-5">
                {' '}
                WORK TOGETHER, <br />
                EAT TOGETHER
              </h4>
              <div className="order-btn-container d-flex justify-content-evenly mt-5">
                <Link to="/menu">
                  <button className="order-btn">Menu</button>
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
      </div>
    </>
  );
}

export default Home;
