import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home/Home';
import Navbar from './components/Navbar/Navbar';
import ProductCardItem from './components/ProductItemCard/ProductCardItem';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productcarditem" element={<ProductCardItem />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
