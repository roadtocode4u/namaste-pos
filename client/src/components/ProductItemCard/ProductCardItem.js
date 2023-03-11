import React, { useState } from 'react';
import './ProductCardItem.css';

function ProductCardItem(props) {
  const [quantity, setQuantity] = useState(1);

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
              className="product-item-card-img mt-2"
              alt="..."
            />
            <div className="p-1">
              <h3 className="text-center">{props.title}</h3>
              <p className="text-center">{props.description}</p>
              <b className="price-rupees">₹{props.price}</b>

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
                  <b>Add To Card</b>
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
