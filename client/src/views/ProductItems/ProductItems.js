import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

import './ProductItems.css';
import ProductCardItem from '../../components/ProductItemCard/ProductCardItem';
import Loader from './../../components/Loader/Loader.js';

function ProductItems() {
  const [productItem, setProductItem] = useState();

  const [searchParams] = useSearchParams();
  const categoryTitle = searchParams.get('categoryTitle');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function featchProductByCategory() {
      setIsLoading(true);
      const response = await axios.get(
        `/productItem?categoryTitle=${categoryTitle}`
      );
      if (response) {
        setProductItem(response.data.data);
      }
      setIsLoading(false);
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
      <Loader isLoading={isLoading} />
    </>
  );
}

export default ProductItems;
