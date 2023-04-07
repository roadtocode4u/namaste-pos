import React, { useEffect, useState } from 'react';
import './Menu.css';
import axios from 'axios';
import CategoryCard from '../../components/CategoryCard/CategoryCard';

const Menu = () => {
  const [productCategory, setProductCategory] = useState();
  async function fetchAllCatergory() {
    const response = await axios.get('/productCategories');
    setProductCategory(response.data.data);
  }

  useEffect(() => {
    fetchAllCatergory();
  });

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
    </div>
  );
};

export default Menu;
