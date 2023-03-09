import React from 'react';
import './AddProduct.css';
import marketplaceImg from './marketplace-img.png';

function addProduct() {
  return (
    <>
      <h2 className="text-center heading">Add Product </h2>
      <div className="container">
        <div className="main-card-div text-center">
          <div className="row">
            <div className="col-md-5 mx-auto d-block">
              <img src={marketplaceImg} className="add-product-img" />
            </div>
            <div className="col-md-7">
              <form>
                <div className="mb-4 mt-3">
                  <input
                    type="text"
                    className="add-product-form-input"
                    id="title"
                    placeholder="Product Title"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    className="add-product-form-input"
                    id="price"
                    placeholder="Product Price"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    className="add-product-form-input"
                    id="description"
                    placeholder="Product Description"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    className="add-product-form-input"
                    id="imgUrl"
                    placeholder="Prooduct imgUrl"
                  />
                </div>

                <button
                  className="button-add-material w-100 mb-4"
                  type="button">
                  <i className="fa-solid fa-right-to-bracket"></i>{' '}
                  <b>Add Product</b>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default addProduct;
