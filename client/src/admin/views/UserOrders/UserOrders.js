import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import './UserOrders.css';
import Heading from './../../../components/Heading/Heading';

function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [openAccordionItemId, setOpenAccordionItemId] = useState(null);

  async function fetchAllOrders() {
    const response = await axios.get('/orders');
    const sortedOrders = response.data.data.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    setOrders(sortedOrders);
  }

  async function updateOrderStatus(orderId, status) {
    try {
      const response = await axios.put('/orders/update-status', {
        orderId,
        status,
      });

      if (response.data.success) {
        await swal({
          title: 'Status Updated',
          text: response.data.message,
          icon: 'success',
          button: 'Aww yiss!',
        });
      } else {
        await swal({
          title: 'Error',
          text: response.data.message,
          icon: 'error',
          button: '😥',
        });
      }
      console.log(response.data.message);
      // Refresh the orders list after updating the status
      fetchAllOrders();
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleAccordionItemClick = (itemId) => {
    setOpenAccordionItemId(itemId === openAccordionItemId ? null : itemId);
  };

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
                  <h6
                    className={`accordion-header ${
                      openAccordionItemId === index ? 'active' : ''
                    }`}
                    id={`flush-heading-${index}`}>
                    <button
                      className={`accordion-button fs-4 ${
                        openAccordionItemId !== index ? 'collapsed' : ''
                      } ${openAccordionItemId === index ? 'active' : ''}`}
                      type="button"
                      onClick={() => handleAccordionItemClick(index)}
                      aria-expanded={openAccordionItemId === index}
                      aria-controls={`flush-collapse-${index}`}>
                      <div className="order-content">
                        <p className="child-item-1">{order.tableNumber}</p>
                        <p className="child-item-2"> {order.status}</p>
                        <p className="child-item-1">{createdAt}</p>
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            updateOrderStatus(order.orderId, 'delivered')
                          }>
                          Mark as Delivered
                        </button>
                      </div>
                    </button>
                  </h6>
                  {order.items.map((item, i) => {
                    return (
                      <div
                        key={i}
                        id={`flush-collapse-${index}`}
                        className={`accordion-collapse collapse ${
                          openAccordionItemId === index ? 'show' : ''
                        }`}
                        aria-labelledby={`flush-heading-${index}`}
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
