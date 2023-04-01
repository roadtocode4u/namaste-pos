import React, { useState, useEffect } from 'react';
import './BookTable.css';
import axios from 'axios';
import AvailableTable from './table.png';
import { currentUser } from './../../utils/auth';
import swal from 'sweetalert';

const BookTable = () => {
  const [table, setTable] = useState([]);

  async function fetchTables() {
    const response = await axios.get('/diningTables');
    setTable(response.data.data);
  }

  useEffect(() => {
    fetchTables();
  }, []);

  const tableBooking = async (e) => {
    const userId = currentUser._id;

    const response = await axios.post(`/bookTable`, {
      tableNumber: e.target.value,
      userId: userId,
    });

    await swal({
      text: response.data.message,
      button: 'Okay',
    });

    window.location.href = '/';
  };

  return (
    <>
      <h4 className="text-center table-booking-heading">Table Booking</h4>

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
                <img src={AvailableTable} className="table" alt="random" />

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
      </div>
    </>
  );
};

export default BookTable;
