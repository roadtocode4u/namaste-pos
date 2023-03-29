import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home/Home';
import Navbar from './components/Navbar/Navbar';
import AddProduct from './admin/views/AddProduct/AddProduct';
import ProductList from './admin/views/ProductList/ProductList';
import ProductItems from './views/ProductItems/ProductItems';
import UpdateProductItem from './admin/views/UpdateProductItem/UpdateProductItem';

// admin views
import Admin from './admin/views/Admin/Admin';
import AdminDashboard from './admin/views/AdminDashboard/AdminDashboard';
import Tables from './admin/views/Tables/Tables';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* User Routes */}
          <Route path="/product-item" element={<ProductItems />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Admin />}>
            <Route index element={<AdminDashboard />} />
            <Route path="addProduct" element={<AddProduct />} />
            <Route path="productList" element={<ProductList />} />
            <Route path="productItem/:id" element={<UpdateProductItem />} />
            <Route path="tables" element={<Tables />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
