// import React, { useEffect } from 'react';
// import axios from 'axios';
// import swal from 'sweetalert';
// import { currentUser } from './../../utils/auth';

// const BookTable = () => {
//   const tableBooking = async () => {
//     const url = window.location.pathname;
//     const tableNumber = url.split('/').pop();
//     const userId = currentUser._id;
//     console.log(tableNumber);

//     const response = await axios.post(`/bookTable/${tableNumber}`, {
//       userId: userId,
//     });
//     console.log(response.data.data.occupied);
//     console.log(typeof response.data.data.occupied);

//     await swal({
//       text: response.data.message,
//       button: 'Okay',
//     });

//     window.location.href = '/';
//   };

//   useEffect(() => {
//     tableBooking();
//   }, []);

//   return <div></div>;
// };

// export default BookTable;


import React, { useState, useEffect } from 'react'
import './BookTable.css'
import axios from 'axios';
import AvailableTable from './table.png';

const BookTable = () => {
  const [table, setTable] = useState([]);

  async function fetchTables() {
    const response = await axios.get('/diningTables');
    setTable(response.data.data);
  }

  useEffect(() => {
    fetchTables();
  }, []);

  return (
    <>
      <h4 className='text-center table-booking-heading'>Table Booking</h4>

      <div className="container">
        <div className="row text-center">
          {table?.map((table, index) => {
            return (
              <div
                key={index}
                className={`col-md-3 tableCard ${table.occupied && 'bg-red'}`}>
                <p className="tableNumber">
                  <div className='table-number-div text-center'>
                  <h5 className='text-center mt-1'>{table.tableNumber}</h5>
                  </div>
                </p>
                <img src={AvailableTable} className="table" alt="random" />
                <br></br>
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}

export default BookTable