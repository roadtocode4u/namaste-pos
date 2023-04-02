import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import './ProductCardItem.css';

function ProductCardItem(props) {
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

  return (
    <>
      <div className="product-item-card mt-5">
        <div className="row">
          <div className="col-md-12">
            <img
              src={props.imgUrl}
              className="product-item-card-img"
              alt="..."
            />
            <div className="p-1">
              <h4 className="text-center">{props.title}</h4>
              <div className="price-category-div">
                <b className="price-rupees mt-2 mb-3">₹{props.price}</b>
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
