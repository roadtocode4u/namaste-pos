import React, { useState, useEffect } from 'react';
import axios from 'axios';

import swal from 'sweetalert';
import './BookTable.css';
import { currentUser } from './../../utils/auth';
import Loader from './../../components/Loader/Loader';
import AvailableTable from './table.png';
import Heading from './../../components/Heading/Heading';

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
    fetchTables();
  }, []);

  const tableBooking = async (e) => {
    const userId = currentUser._id;
    setIsLoading(true);
    const response = await axios.post(`/bookTable`, {
      tableNumber: e.target.value,
      userId: userId,
    });

    await swal({
      text: response.data.message,
      button: 'Okay',
    });
    setIsLoading(false);
    window.location.href = '/';
  };

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

                <button
                  className="table-book-btn"
                  value={table.tableNumber}
                  onClick={tableBooking}>
                  Book Now
                </button>
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
