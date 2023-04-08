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
              <h4>📛{item.name}</h4>
              🔢Quantity: {item.quantity}
              <br />
              <p className="mb-2 product-card-price">₹{item.price}</p>
              <img
                className="deleteIcon"
                src={deleteIcon}
                onClick={removemylist}
              />
              <img className="product-img" src={item.imgUrl} />
            </div>
          );
        })}
        <div className="text-center">
          <button
            className="btn btn-success confirm-btn"
            onClick={placeConfirmOrder}>
            <b>Confirm Orders</b>
          </button>
        </div>
      </div>
    </>
  );
}

export default MyProductList;
