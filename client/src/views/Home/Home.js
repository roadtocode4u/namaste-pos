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
      <div className="main-div">
        <div className="container">
          <div className="row">
            <div className="col-md-6 product-item">
              <h1 className="heading-h1 text-center">Namaste Pos...🙏</h1>
            </div>
            <div className="col-md-6">
              <h4 className="text-center namaste-pos-heading ">
                Say Namaste to a better food business with our user-friendly POS
                software.
              </h4>
            </div>
            <div className="text-center">
              <h1 className="homepage-heading">WORK TOGETHER, EAT TOGETHER</h1>
              {pendingBooking ? (
                <Link className="online-booking-btn" to={`${pendingBooking}`}>
                  <button className="order-btn">
                    <b>Book Table</b>
                  </button>
                </Link>
              ) : (
                <Link className="online-booking-btn" to="/bookTable">
                  <button className="order-btn">
                    <b>Book Table</b>
                  </button>
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
