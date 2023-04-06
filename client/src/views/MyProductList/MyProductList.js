 import React from 'react';
import './MyProductList.css';
import { myFoodListItems } from './../../util/myList';
function MyProductList() {
  return (
    <>
      <div>
        <h1 className="text-center my-product-list-heading">🍽 MyList</h1>
        {myProductListItems.map((item, index) => {
          return (
            <div key={index} className="container">
              <div key={index} className="product-card">
                <h4>{item.name}</h4>
                <b>Quantity: {item.quantity}</b>{' '}
                <b className="mb-2 product-card-price">{item.price}</b>
                <img className="product-img" src={item.imgUrl} />
                <div className="text-center">
                  <button className="btn btn-danger remove-btn">
                    <b>Remove</b>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <div className="text-center">
          <button className="btn btn-success Addmore-btn">
            <b>Add More Items</b>
          </button>
          <button className="btn btn-warning confirm-btn" onClick={confirmOrder}>
            <b>Confirm Orders</b>
          </button>
        </div>
      </div>
    </>
  );
}

export default MyProductList;
