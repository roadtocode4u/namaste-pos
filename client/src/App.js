import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home/Home';
import Navbar from './components/Navbar/Navbar';
import AddProduct from './admin/AddProduct/AddProduct';
import ProductList from './admin/ProductList/ProductList';
import ProductItems from './views/ProductItems/ProductItems';

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
