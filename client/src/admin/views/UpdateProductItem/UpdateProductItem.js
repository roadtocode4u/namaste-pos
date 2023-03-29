import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

import marketplaceImg from './marketplace-img.png';
import './UpdateProductItem.css';
import Loader from '../../../components/Loader/Loader';

function UpdateProductItem() {
  const { id } = useParams();

  const [productItem, setProductItem] = useState({
    title: '',
    price: '',
    description: '',
    imgUrl: '',
    categoryId: '',
  });

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

  useEffect(() => {
    async function getProductItem() {
      setIsLoading(true);
      const { data } = await axios.get(`/productItem/${id}`);
      const apiData = data?.data;
      setIsLoading(false);
    

      setProductItem({
        ...productItem,
        title: apiData?.title,
        price: apiData?.price,
        description: apiData?.description,
        imgUrl: apiData?.imgUrl,
        categoryId: apiData?.productCategory?._id,
      });
    }
    getProductItem();
  }, []);

  async function updateProductItem() {
    setIsLoading(true);
    const response = await axios.put(`/productItem/${id}`, productItem);
    setIsLoading(false);
    console.log(response);
    if (response.status === 200) {
      swal({
        title: 'Update Successfully !!',
        text: response.data.message,
        icon: 'success',
        button: 'Aww yiss!',
      });
    }
  }

  return (
    <>
      <div className="container">
        <h4 className="text-center heading">Update Product </h4>
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
                    value={productItem.title}
                    onChange={(e) => {
                      setProductItem({ ...productItem, title: e.target.value });
                    }}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    className="add-product-form-input"
                    id="price"
                    placeholder="Product Price"
                    value={productItem.price}
                    onChange={(e) => {
                      setProductItem({ ...productItem, price: e.target.value });
                    }}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    className="add-product-form-input"
                    id="description"
                    placeholder="Product Description"
                    value={productItem.description}
                    onChange={(e) => {
                      setProductItem({
                        ...productItem,
                        description: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    className="add-product-form-input"
                    id="imgUrl"
                    placeholder="Prooduct imgUrl"
                    value={productItem.imgUrl}
                    onChange={(e) => {
                      setProductItem({
                        ...productItem,
                        imgUrl: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="mb-4">
                  <select
                    className="add-product-form-input"
                    id="categoryTitle"
                    value={productItem.categoryId}
                    onChange={(e) => {
                      setProductItem({
                        ...productItem,
                        categoryId: e.target.value,
                      });
                    }}>
                    <option value="">Select Category</option>
                    {categories.map((category, index) => (
                      <option value={category._id} key={index}>
                        {category.categoryTitle}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  className="button-add-material w-100 mb-4"
                  type="button"
                  onClick={updateProductItem}>
                  <i className="fa-solid fa-right-to-bracket"></i>
                  <b> Update Product</b>
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

export default UpdateProductItem;
