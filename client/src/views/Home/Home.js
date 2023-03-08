import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCardItem from '../../components/ProductItemCard/ProductCardItem';
import './Home.css';

function Home() {
  const [currentProductItem, setCurrentProductItem] = useState([]);

  async function fetchAllItems() {
    console.log('fetching all items');
    const response = await axios.get('/productItems');
    console.log(response.data.data);
    setCurrentProductItem(response.data.data);
  }

  useEffect(() => {
    fetchAllItems();
  }, []);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 product-item">
            <h1 className="heading-h1 text-center">Namaste Pos...🙏</h1>
            <h4 className="text-center mt-3">
              Say Namaste to a better food business with our user-friendly POS
              software.
            </h4>
          </div>
          <div className="col-md-6">
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
            {currentProductItem?.map((productItem, index) => {
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
