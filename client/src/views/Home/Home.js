import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './Home.css';
import CategoryCard from '../../components/CategoryCard/CategoryCard';

function Home() {
  const [productCategory, setProductCategory] = useState();

  async function fetchAllCatergory() {
    const response = await axios.get('/productCategories');
    setProductCategory(response.data.data);
  }

  useEffect(() => {
    fetchAllCatergory();
  });

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 product-item">
            <h1 className="heading-h1 text-center">Namaste Pos...🙏</h1>
          </div>
          <div className="col-md-6">
            <h4 className="text-center namaste-pos-heading">
              Say Namaste to a better food business with our user-friendly POS
              software.
            </h4>
          </div>
        </div>

        <div className="container">
          <h4 className="text-center mt-5 mb-5">
            Inspiration for your first order
          </h4>
          <div className="row">
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
      </div>
    </>
  );
}

export default Home;
