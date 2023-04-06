 import React from 'react';
import './MyProductList.css';
import { myFoodListItems } from './../../util/myList';
function MyProductList() {
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
        <h1 className="text-center heading mb-5">🍽 MyList</h1>
        {myProductListItems.map((item, index) => {
          return (
            <div key={index} className="product-card">
              <h4>{item.name}</h4>
              <b>Quantity: {item.quantity}</b> <br />
              <b className="mb-2 product-card-price">₹{item.price}</b>
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
