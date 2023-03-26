import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

import './ProductList.css';

const ProductList = () => {
  const [productItem, setProductItem] = useState([]);

  async function fetchAllProducts() {
    const response = await axios.get('/productItems');
    setProductItem(response.data.data);
  }

  async function deleteProduct(id) {
    if (
      window.confirm('Are you sure that you wanted to delete this product?')
    ) {
      const response = await axios.delete(`/productItem/${id}`);
      if (response.data.success) {
        await swal({
          title: 'Deleted Successfully !!',
          text: response.data.message,
          icon: 'success',
          button: 'Okay',
        });
      }

      setProductItem((prevProductItem) =>
        prevProductItem.filter((item) => item._id !== id)
      );
    }
  }

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div style={{ marginTop: '70px' }}>
      <table className="products-table" cellPadding="32">
        <thead className="products-table">
          <tr className="text-center">
            <th>NO</th>
            <th>Title</th>
            <th>Price</th>
            <th style={{ width: '320px' }}>Description</th>
            <th style={{ width: '150px' }}>Created At</th>
            <th style={{ width: '150px' }}>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productItem?.map((item, index) => {
            const createdAt = new Date(item.createdAt).toLocaleString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
              hour12: true,
            });
            const updatedAt = new Date(item.updatedAt).toLocaleString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
              hour12: true,
            });

            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>{createdAt}</td>
                <td>{updatedAt}</td>
                <td>
                  <Link to={`/admin/productItem/${item._id}`}>
                    <button className="mx-3 list-update-btn">
                      <b>Update</b>
                    </button>
                  </Link>
                  <button
                    className="list-delete-btn"
                    onClick={() => {
                      deleteProduct(item._id);
                    }}>
                    <b>Delete</b>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
