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

// admin views
import Admin from './admin/views/Admin/Admin';
import AdminDashboard from './admin/views/AdminDashboard/AdminDashboard';
import Tables from './admin/views/Tables/Tables';
import AddTable from './admin/views/AddTable/AddTable';
import UpdateAddTable from './admin/views/UpdateAddTable/UpdateAddTable';
import ShowTableInfo from './admin/views/ShowTableInfo/ShowTableInfo';

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
          <Route path="/scanner" element={<Scanner />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Admin />}>
            <Route index element={<AdminDashboard />} />
            <Route path="addProduct" element={<AddProduct />} />
            <Route path="productList" element={<ProductList />} />
            <Route path="productItem/:id" element={<UpdateProductItem />} />
            <Route path="tables" element={<Tables />} />
            <Route path="addTable" element={<AddTable />} />
            <Route path="addTable/:id" element={<UpdateAddTable />} />
            <Route path="showInfo/:id" element={<ShowTableInfo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
