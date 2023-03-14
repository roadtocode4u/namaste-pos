import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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
      {productItem?.map((productItem, index) => {
        return (
          <ProductCardItem
            description={productItem.description}
            imgUrl={productItem.imgUrl}
            price={productItem.price}
            title={productItem.title}
            key={index}
          />
        );
      })}
    </>
  );
}

export default ProductItems;
