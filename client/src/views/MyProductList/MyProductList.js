import React from 'react';

import './MyProductList.css';
import { myProductListItems } from './../../utils/myListItem.js';
function MyProductList() {
  return (
    <>
      <div>
        <h1 className="text-center heading mb-5">🍽 MyList</h1>
        {myProductListItems.map((item, index) => {
          return (
            <div key={index} className='container'>
         
            <div key={index} className="product-card">
              <h4>{item.name}</h4>
              <b>Quantity: {item.quantity}</b>{' '}
              <b className="mb-2 product-card-price">{item.price}</b>
              <img className="product-img" src={item.imgUrl} />
              <div className='row'>
              <div className='col-md-6'>
                <button className="remove-btn"><b>Remove</b></button>
            </div>
            <div className='col-md-6'>
                <button className="add-btn"><b>Add</b></button>
            </div>
            </div>
            </div>
            </div>
            
           
          );
        })}
        <div className="text-center">
          <button className="btn btn-success confirm-btn">
            <b>Confirm Orders</b>
          </button>
        </div>
      </div>
    </>
  );
}

export default MyProductList;
