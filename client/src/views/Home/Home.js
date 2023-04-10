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
                <p className="namastePOS-heading">NamastePOS</p>
              </div>
              <div className='row'>
                <div className='col-md-6'>
                  <h5 className="homepage-heading">
                    WORK TOGETHER, <br />
                    EAT TOGETHER
                  </h5>
                </div>
                <div className='col-md-6'>
                 <div className='order-btn-container d-flex justify-content-evenly'>
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
        </div>
      </div>
    </>
  );
}

export default Home;
