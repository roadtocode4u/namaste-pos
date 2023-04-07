import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './Home.css';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import { pendingBooking } from '../../utils/auth';

function Home() {
  const [productCategory, setProductCategory] = useState();

  async function fetchAllCatergory() {
    const response = await axios.get('/productCategories');
    setProductCategory(response.data.data);
  }

  useEffect(() => {
    fetchAllCatergory();
  });

  return (
    <>
      <div className="main-div mt-5">
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
              <button className="order-btn me-5">Menu</button>
              {pendingBooking ? (
                <Link className="online-booking-btn" to={`${pendingBooking}`}>
                  <button className="order-btn">Book Table</button>
                </Link>
              ) : (
                <Link className="online-booking-btn" to="/bookTable">
                  <button className="order-btn">Book Table</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <p className="text-center mb-5 mt-5 category-heading">
        Inspiration for your first order
      </p>
      <div className="row">
        {productCategory?.map((catergory, index) => {
          return (
            <CategoryCard
              categoryTitle={catergory.categoryTitle}
              itemImgURL={catergory.itemImgURL}
              key={index}
            />
          );
        })}
      </div>
    </>
  );
}

export default Home;
