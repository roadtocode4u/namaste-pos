import React from 'react';
import './CategoryCard.css';
import { Link } from 'react-router-dom';

function CategoryCard({ categoryTitle, itemImgURL }) {
  return (
    <>
      <div className="category-card">
        <Link to={`/product-item?categoryTitle=${categoryTitle}`}>
          <img className="caterory-img" src={itemImgURL} />
        </Link>
        <p className="text-center mt-3 catergory-title">{categoryTitle}</p>
      </div>
    </>
  );
}

export default CategoryCard;
