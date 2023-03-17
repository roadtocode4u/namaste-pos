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
        <div className="row">
          {productItem?.map((productItem, index) => {
            return (
              <ProductCardItem
                imgUrl={productItem.imgUrl}
                price={productItem.price}
                categoryTitle={productItem.categoryTitle}
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
