import React from 'react';
import './CategoryCard.css';

function CategoryCard({ categoryTitle, itemImgURL }) {
  return (
    <>
      <div className="category-card">
        <img className="caterory-img" src={itemImgURL} />
        <p className="text-center mt-3 catergory-title">{categoryTitle}</p>
      </div>
    </>
  );
}

export default CategoryCard;
