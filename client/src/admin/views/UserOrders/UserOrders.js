import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserOrders.css';
import Heading from './../../../components/Heading/Heading';

function UserOrders() {
  const [orders, setOrders] = useState([]);

  async function fetchAllOrders() {
    const response = await axios.get('/orders');
    const sortedOrders = response.data.data.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    setOrders(sortedOrders);
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <>
      <Heading title={'Orders'} />
      <div className="faq-div">
        <div className="container-faq" id="faq">
          {orders?.map((order, index) => {
            const createdAt = new Date(order.createdAt).toLocaleString(
              'en-US',
              {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true,
              }
            );
            return (
              <div
                className="accordion accordion-flush"
                id="faq-parent"
                key={index}>
                <div className="accordion-item">
                  <h6 className="accordion-header" id="flush-headingOne">
                    <button
                      className="accordion-button collapsed  fs-4"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne">
                      <div className="order-content">
                        <p className="child-item-1">{order.tableNumber}</p>
                        <p className="child-item-2"> {order.status}</p>
                        <p className=''>{createdAt}</p>
                      </div>
                     </button>
                  </h6>
                  {order.items.map((item, i) => {
                    return (
                      <div
                        key={i}
                        id="flush-collapseOne"
                        className="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne"
                        data-bs-parent="#faq-parent">
                        <div className="accordion-body fs-5">
                          <div className="order-content">
                            <p className="order-item-1 "> {item.name}</p>
                            <p className="order-item-2">{item.quantity}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default UserOrders;
