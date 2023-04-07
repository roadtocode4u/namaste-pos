import React, { useState, useEffect } from 'react'
import { currentUser } from './../../utils/auth';
import axios from 'axios';

import './Orders.css'

function Orders() {

  const [order, setOrder] = useState([])

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
      <div className="container">
        <div className='row'>
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
              <div key={index} >
                {order.items?.map((item, i) => {                  
                  return (
                    <div key={i} className="product-card">
                      <h5>{item.name}</h5>
                       Quantity: {item.quantity} <br/>
                       {createdAt} <br/>
                      {item.price}
                    </div>
                  )
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}

export default Orders