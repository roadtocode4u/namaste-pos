import React, { useState, useEffect } from 'react';
import { currentUser } from './../../utils/auth';
import axios from 'axios';

import './Orders.css';
import Heading from './../../components/Heading/Heading';

function Orders() {
  const [order, setOrder] = useState([]);

  async function fetchOrder() {
    const response = await axios.get(`/orders/${currentUser._id}`);
    setOrder(response.data.data);
    console.log(response.data.data);
  }

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <Heading title={'My Orders'} />
        <div className="row">
          {order?.map((order, index) => {
            const createdAt = new Date(order.createdAt).toLocaleString(
              'en-US',
              {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              }
            );
            return (
              <div key={index} className="row">
                {order.items?.map((item, i) => {
                  return (
                    <>
                      <div key={i} className="order-card">
                        <div className="created-date text-center mb-3">
                          {createdAt}
                        </div>
                        <img className="order-img-card" src={item.imgUrl} />
                        <h5 className="text-center mt-3">📛{item.name}</h5>
                        <div className="order-card-information-container">
                          <span>🪙{item.price}₹</span>
                          <span>🔢Quantity: {item.quantity}</span>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Orders;
