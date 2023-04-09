import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import swal from 'sweetalert';

import './ProductCardItem.css';

function ProductCardItem({ imgUrl, price, title, categoryTitle }) {
  const [quantity, setQuantity] = useState(1);

  const [searchParams] = useSearchParams();
  const categoryTitleparam = searchParams.get('categoryTitle');

  const setCount = () => {
    if (quantity <= 1) {
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
            <img
              src={imgUrl}
              className="product-item-card-img mt-4"
              alt="..."
            />
            <div className="p-1">
              <h5 className="text-center mt-2">{title}</h5>
              <div className="price-category-div">
                <p className="price-rupees mt-2 mb-3">₹{price}</p>
                <span className="card-category-type mt-2 mb-3">
                  <i className="fa-solid fa-pot-food"></i>{' '}
                  {categoryTitle || categoryTitleparam}
                </span>
              </div>

              <div className="quantity-button-container">
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

              <div className="text-center">
                <button
                  type="button"
                  onClick={addToList}
                  className="btn-add-to-cart text-center mb-2 mt-3">
                  <i className="fa-solid fa-cart-plus"></i> Add To Cart
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
