import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCardItem from '../../components/ProductItemCard/ProductCardItem';
import './Home.css';
import CategoryCard from '../../components/CategoryCard/CategoryCard';

function Home() {
  const [currentProductItem, setCurrentProductItem] = useState([]);
  const [productCategory, setProductCategory] = useState();
  const [searchText, setSearchText] = useState('');

  async function fetchAllItems() {
    const response = await axios.get('/productItems');
    setCurrentProductItem(response.data.data);
  }

  async function fetchSpecificItems() {
    const response = await axios.get(`productItem?categoryTitle=${searchText}`);
    setCurrentProductItem(response.data.data);
  }

  async function fetchAllCatergory() {
    const response = await axios.get('/productCategories');
    setProductCategory(response.data.data);
  }

  useEffect(() => {
    fetchAllCatergory();
  });

  useEffect(() => {
    if (searchText.length > 0) {
      fetchSpecificItems();
    } else {
      fetchAllItems();
    }
  }, [searchText]);

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

        <div className="container">
          <div className="col-md-12">
            <div className="search-container text-center">
              <input
                type="text"
                placeholder="Search food..."
                className="input-search"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
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
