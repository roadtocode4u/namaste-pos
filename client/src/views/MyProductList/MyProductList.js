import React from 'react';
import swal from 'sweetalert';

import axios from 'axios';

import { currentUser } from './../../utils/auth.js';
import './MyProductList.css';
import { myProductListItems } from './../../utils/myListItem.js';
import deleteIcon from './../MyProductList/delete-icon.png';
import { myProductListCount } from './../../utils/myListItem.js';
import Heading from '../../components/Heading/Heading.js';

function MyProductList() {
  async function placeConfirmOrder() {
    const response = await axios.post('/order', {
      userId: currentUser,
      items: myProductListItems,
      tableNumber: localStorage.getItem('tableNumber'),
    });

    if (myProductListCount < 1) {
      await swal('Error', 'Empty order cannot be placed', 'error');
    } else if (response.data.success) {
      await swal('Order Placed', response.data.message, 'success');
      localStorage.removeItem('list');
      window.location.href = '/';
    }
  }

  function removemylist(myproductindex) {
    const myProductListItems = localStorage.getItem('list');
    if (myProductListItems) {
      const temp = JSON.parse(myProductListItems);
      temp.splice(myproductindex, 1);
      localStorage.setItem('list', JSON.stringify(temp));
    }

    swal({
      title: 'Deleted!',
      text: 'Your product Item has been deleted',
      icon: 'success',
    });

    window.location.reload();
  }

  return (
    <>
      <div className="row">
        <Heading title={'🍽 MyList'} />
        {myProductListItems.map((item, index) => {
          return (
            <div key={index} className="product-card">
              <img className="product-img" src={item.imgUrl} />
              <h5 className="text-center mt-3">{item.name}</h5>
              <div className="product-card-information-container">
                <sapn>₹{item.price}</sapn>{' '}
                <span>Quantity: {item.quantity}</span>
              </div>
              <img
                className="deleteIcon"
                src={deleteIcon}
                onClick={removemylist}
              />
            </div>
          );
        })}
        <div className="text-center">
          <button
            className="btn btn-success confirm-btn"
            onClick={placeConfirmOrder}>
            Confirm Orders
          </button>
        </div>
      </div>
    </>
  );
}

export default MyProductList;
