import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './views/Home/Home';
import Navbar from './components/Navbar/Navbar';
import AddProduct from './admin/views/AddProduct/AddProduct';
import ProductList from './admin/views/ProductList/ProductList';
import ProductItems from './views/ProductItems/ProductItems';
import UpdateProductItem from './admin/views/UpdateProductItem/UpdateProductItem';
import BookTable from './views/BookTable/BookTable';
import Scanner from './views/Scanner/Scanner';
import Menu from './views/Menu/Menu';
import Orders from './views/Orders/Orders';

// admin views
import Admin from './admin/views/Admin/Admin';
import AdminDashboard from './admin/views/AdminDashboard/AdminDashboard';
import AddTable from './admin/views/AddTable/AddTable';
import UpdateAddTable from './admin/views/UpdateTable/UpdateTable';
import TableList from './admin/views/TableList/TableList';
import MyProductList from './views/MyProductList/MyProductList';
import BookTableLogic from './views/BookTable/BookTableLogic';
import UserOrders from './admin/views/UserOrders/UserOrders';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* User Routes */}
          <Route path="/product-item" element={<ProductItems />} />
          <Route path="/bookTable" element={<BookTable />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/bookTable/:tableNumber" element={<BookTableLogic />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="myProductList" element={<MyProductList />} />
          <Route path="/order/:userId" element={<Orders />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Admin />}>
            <Route index element={<AdminDashboard />} />
            <Route path="addProduct" element={<AddProduct />} />
            <Route path="productList" element={<ProductList />} />
            <Route path="productItem/:id" element={<UpdateProductItem />} />
            <Route path="addTable" element={<AddTable />} />
            <Route path="addTable/:id" element={<UpdateAddTable />} />
            <Route path="tableList" element={<TableList />} />
            <Route path="Orders" element={<UserOrders />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
