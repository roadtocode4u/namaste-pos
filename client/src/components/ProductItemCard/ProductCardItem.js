import React from 'react';
import './ProductCardItem.css';

function ProductCardItem(props) {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 card-container">
      <div className="product-item-card">
        <div className="product-food-card-body">
          <div>
            <img src={props.imgUrl} alt="" className="food-card-img" />
          </div>

          <div className="product-card-sub-container">
            <h6 className="text-uppercase fw-bold">{props.title}</h6>
            <p className="description">{props.description}</p>
            <hr />

            <div className="price-qnt-container">
              <div className="price text-success">
                <span> {props.price}</span>
              </div>
            </div>

            <div>
              <button type="button" className="btn-add-to-list btn btn-danger">
                Add To List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCardItem;
