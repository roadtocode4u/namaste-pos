import React, { useState } from 'react';
import './AddProduct.css';
import axios from 'axios';
import swal from 'sweetalert';
import marketplaceImg from './marketplace-img.png';

function addProduct() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  async function addProduct() {
    if (!title || !price || !description || !imgUrl) {
      await swal({
        title: 'Please fill all the fields',
        text: response.data.message,
        icon: 'error',
        button: '😥',
      });
      return;
    }

    const response = await axios.post('/productItem', {
      title,
      price,
      description,
      imgUrl,
    });

    if (response.data.success) {
      await swal({
        title: 'Product Added Successfully!!',
        text: response.data.message,
        icon: 'success',
        button: 'Aww yiss!',
      });
    } else {
      swal(response.data.message);
    }

    setTitle('');
    setPrice('');
    setDescription('');
    setImgUrl('');
  }

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
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    className="add-product-form-input"
                    id="price"
                    placeholder="Product Price"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    className="add-product-form-input"
                    id="description"
                    placeholder="Product Description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    className="add-product-form-input"
                    id="imgUrl"
                    placeholder="Prooduct imgUrl"
                    value={imgUrl}
                    onChange={(e) => {
                      setImgUrl(e.target.value);
                    }}
                  />
                </div>

                <button
                  className="button-add-material w-100 mb-4"
                  type="button"
                  onClick={addProduct}>
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
