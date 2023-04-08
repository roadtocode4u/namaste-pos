import React, { useEffect, useState } from 'react';
import './Menu.css';
import axios from 'axios';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import ProductCardItem from '../../components/ProductItemCard/ProductCardItem';

const Menu = () => {
  const [productCategory, setProductCategory] = useState();
  const [productItem, setProductItem] = useState();
  async function fetchAllCatergory() {
    const response = await axios.get('/productCategories');
    setProductCategory(response.data.data);
  }

  async function fetchAllProductItems() {
    const response = await axios.get('/productItems');
    setProductItem(response.data.data);
  }

  useEffect(() => {
    fetchAllCatergory();
    fetchAllProductItems();
  }, []);

  return (
    <div>
      <h2 className="text-center mb-5 category-heading">Order By Category</h2>
      <div className="row container-fluid">
        {productCategory?.map((catergory, index) => {
          return (
            <CategoryCard
              categoryTitle={catergory.categoryTitle}
              itemImgURL={catergory.itemImgURL}
              key={index}
            />
          );
        })}
      </div>
      <h2 className="text-center mb-5 category-heading">Explore Our Menu</h2>
      <div className="row container-fluid">
        {productItem?.map((productItem, index) => {
          return (
            <ProductCardItem
              imgUrl={productItem.imgUrl}
              price={productItem.price}
              title={productItem.title}
              key={index}
              categoryTitle={productItem.productCategory.categoryTitle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
