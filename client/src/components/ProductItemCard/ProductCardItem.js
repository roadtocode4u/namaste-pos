import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import swal from 'sweetalert';

import './ProductCardItem.css';

function ProductCardItem({ imgUrl, price, title }) {
  const [quantity, setQuantity] = useState(1);

  const [searchParams] = useSearchParams();
  const categoryTitle = searchParams.get('categoryTitle');
 
  const setCount = () => {
    if (quantity <= 0) {
      return;
    } else {
      setQuantity(quantity - 1);
    }
  };

  async function addToList() {
    const listObject = {
      name: title,
      price: price,
      quantity: quantity,
      imgUrl: imgUrl,
    };

    const existingList = JSON.parse(localStorage.getItem('list')) || [];

    existingList.push(listObject);

    localStorage.setItem('list', JSON.stringify(existingList));

    await swal({
      title: 'Added to List 💃',
      icon: 'success',
    });

    window.location.reload();
  }

  return (
    <>
      <div className="product-item-card mt-5">
        <div className="row">
          <div className="col-md-12">
            <img src={imgUrl} className="product-item-card-img" alt="..." />
            <div className="p-1">
              <h4 className="text-center">{title}</h4>
              <div className="price-category-div">
                <b className="price-rupees mt-2 mb-3">₹{price}</b>
                <b className="card-category-type mt-2 mb-3">
                  <i className="fa-solid fa-pot-food"></i> {categoryTitle}
                </b>
              </div>

              <div className="quantity-button">
                <span className="count-button" onClick={setCount}>
                  <p className="plus-minus">-</p>
                </span>
                <span className="count-text">{quantity}</span>
                <span
                  className="count-button"
                  onClick={() => {
                    setQuantity(quantity + 1);
                  }}>
                  <p className="plus-minus">+</p>
                </span>
              </div>

              <div>
                <button
                  type="button"
                  onClick={addToList}
                  className="btn-add-to-card text-center mb-2">
                  <b>
                    <i className="fa-solid fa-cart-plus"></i> Add To Card
                  </b>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCardItem;
