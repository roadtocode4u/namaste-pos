import React from 'react';
import './Admin.css';
import { Outlet } from 'react-router-dom';

function Admin() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Admin;
