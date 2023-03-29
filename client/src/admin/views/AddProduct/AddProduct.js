import React, { useEffect, useState } from 'react';
import './AddProduct.css';
import axios from 'axios';
import swal from 'sweetalert';
import marketplaceImg from './marketplace-img.png';
import Loader from '../../../components/Loader/Loader';

function addProduct() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getCategories() {
    setIsLoading(true);
    const { data } = await axios.get('/productCategories');
    setCategories(data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getCategories();
  }, []);

  async function addProduct() {
    if (!title || !price || !description || !imgUrl || !categoryId) {
      await swal({
        title: 'Please fill all the fields',
        text: response.data.message,
        icon: 'error',
        button: '😥',
      });
      return;
    }
    setIsLoading(true);
    const response = await axios.post('/productItem', {
      title,
      price,
      description,
      imgUrl,
      categoryId,
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

    setIsLoading(false);

    setTitle('');
    setPrice('');
    setDescription('');
    setImgUrl('');
    setCategoryId('');
  }

  return (
    <>
      <div className="container">
        <h4 className="text-center heading">Add Product </h4>
        <div className="main-card-div text-center">
          <div className="row">
            <div className="col-md-5 mx-auto d-block">
              <img src={marketplaceImg} className="add-product-img" />
            </div>
            <div className="col-md-7">
              <form>
                <div className="mb-4 mt-2">
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
                <div className="mb-4">
                  {
                    <select
                      className="add-product-form-input"
                      id="category"
                      value={categoryId}
                      onChange={(e) => {
                        setCategoryId(e.target.value);
                      }}>
                      <option value="">Select Category</option>
                      {categories?.map((category, index) => (
                        <option value={category._id} key={index}>
                          {category.categoryTitle}
                        </option>
                      ))}
                    </select>
                  }
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
      <Loader isLoading={isLoading}/>
    </>
  );
}

export default addProduct;
