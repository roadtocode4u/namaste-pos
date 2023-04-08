import React, { useState, useEffect } from 'react';
import { currentUser } from './../../utils/auth';
import axios from 'axios';

import './Orders.css';
import Heading from './../../components/Heading/Heading'

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
            <div key={index}>
              {order.items?.map((item, i) => {
                return (
                  <>
                    <div key={i} className="order-card">
                      <h5>📛{item.name}</h5>
                      <img className="img-card" src={item.imgUrl} />
                      <b>₹{item.price}</b> <br />
                      🔢Quantity: {item.quantity}
                      <br />
                      📅 {createdAt}
                    </div>
                  </>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Orders;
