import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './BookTable.css';
import Loader from './../../components/Loader/Loader';
import AvailableTable from './table.png';
import Heading from './../../components/Heading/Heading';
import { loginRequired } from '../../utils/loginRequired';
import { Link } from 'react-router-dom';

const BookTable = () => {
  const [table, setTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchTables() {
    setIsLoading(true);
    const response = await axios.get('/diningTables');
    setTable(response.data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    loginRequired();
    fetchTables();
  }, []);

  return (
    <>
      <Heading title={'Table Booking'} />

      <div className="container">
        <div className="row text-center">
          {table?.map((table, index) => {
            return (
              <div
                key={index}
                className={`col-md-3 tableCard ${table.occupied && 'bg-red'}`}>
                <p className="tableNumber">
                  <div className="table-number-div text-center">
                    <h5 className="text-center mt-1">{table.tableNumber}</h5>
                  </div>
                  <div className="mt-3">
                    <b className="text-center">Capacity: {table.capacity}</b>
                  </div>
                </p>
                <img
                  src={AvailableTable}
                  className="table-booing-img"
                  alt="random"
                />

                <Link to={`/bookTable/${table.tableNumber}`}>
                  <button className="table-book-btn">Book Now</button>
                </Link>
                <br></br>
              </div>
            );
          })}
        </div>
        <Loader isLoading={isLoading} />
      </div>
    </>
  );
};

export default BookTable;
