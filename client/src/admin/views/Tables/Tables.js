import React, { useState, useEffect } from 'react';
import './Tables.css';
import axios from 'axios';
import AvailableTable from './table.png';

const Tables = () => {
  const [table, setTable] = useState([]);

  async function fetchTalbles() {
    console.log('fetching all tables');
    const response = await axios.get('/diningTables');
    console.log(response.data.data);
    setTable(response.data.data);
  }

  useEffect(() => {
    fetchTalbles();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row text-center">
          {table?.map((table, index) => {
            return (
              <div
                key={index}
                className={`col-md-3 tableCard ${table.occupied && 'bg-red'}`}>
                <p className="tableNumber">
                  Table Number - {table.tableNumber}
                </p>
                <img src={AvailableTable} className="table" alt="random" />
                <br></br>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Tables;
