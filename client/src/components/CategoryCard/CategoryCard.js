import React from 'react';
import { Link } from 'react-router-dom';

import './CategoryCard.css';

function CategoryCard({ categoryTitle, itemImgURL }) {
  return (
    <>
      <div className="category-card">
        <Link
          className="category-title-link"
          to={`/product-item?categoryTitle=${categoryTitle}`}>
          <img className="caterory-img" src={itemImgURL} />
          <p className="text-center mt-3 catergory-title">{categoryTitle}</p>
        </Link>
      </div>
    </>
  );
}

export default CategoryCard;
