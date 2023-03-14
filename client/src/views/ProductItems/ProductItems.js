import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './ProductItems.css';
import ProductCardItem from '../../components/ProductItemCard/ProductCardItem';

function ProductItems() {
  const [productItem, setProductItem] = useState();

  const [searchParams] = useSearchParams();
  const categoryTitle = searchParams.get('categoryTitle');

  useEffect(() => {
    async function featchProductByCategory() {
      const response = await axios.get(
        `/productItem?categoryTitle=${categoryTitle}`
      );
      if (response) {
        setProductItem(response.data.data);
      }
    }
    featchProductByCategory();
  }, []);

  return (
    <>
      <div className="container">
        <div className="col-md-12">
          <div className="search-container text-center">
            <input
              type="text"
              placeholder="Search food..."
              className="input-search"
            />
          </div>
        </div>
      </div>

      <div className="food-items-result">
        <div className="row food-items-row">
          {productItem?.map((productItem, index) => {
            return (
              <ProductCardItem
                imgUrl={productItem.imgUrl}
                price={productItem.price}
                title={productItem.title}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ProductItems;
