import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { Link } from 'react-router-dom';
import { restrictAccessIfNotAdmin } from './../../../utils/role';
import MENU_ITEM from './menuConfig';

function AdminDashboard() {
  const [menuItem, setMenuItem] = useState(MENU_ITEM);
  useEffect(() => {
    restrictAccessIfNotAdmin();
  }, []);

  useEffect(() => {
    setMenuItem(MENU_ITEM);
  }, []);
  return (
    <div className="container">
      <div className="main-menu-container">
        <div className="main-menu-item-div">
          {menuItem.map((item, index) => {
            return (
              <div key={index} className="menu-items">
                <Link to={item?.path} className="link-tag">
                  <img src={item.icon} className="menu-item-icon" />
                  <h6 className="mt-3">{item.title}</h6>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
