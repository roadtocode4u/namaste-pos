import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home/Home';
import Navbar from './components/Navbar/Navbar';
import AddProduct from './admin/views/AddProduct/AddProduct';
import ProductList from './admin/views/ProductList/ProductList';
import ProductItems from './views/ProductItems/ProductItems';
import UpdateProductItem from './admin/views/UpdateProductItem/UpdateProductItem';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/product-item" element={<ProductItems />} />
          <Route path="/productItem/:id" element={<UpdateProductItem />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
