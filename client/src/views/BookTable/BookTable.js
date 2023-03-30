import React, { useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

const BookTable = () => {
  const tableBooking = async () => {
    const url = window.location.pathname;
    const tableNumber = url.split('/').pop();
    const userId = '63f9020c0452154805b490c6';
    console.log(tableNumber);

    const response = await axios.post(`/bookTable/${tableNumber}`, {
      userId: userId,
    });
    console.log(response.data.data.occupied);
    console.log(typeof response.data.data.occupied);

    // if (response.data.data.occupied) {
    //   await swal({
    //     title: 'Table Booked',
    //     text: response.data.message,
    //     icon: 'success',
    //     button: 'Aww yiss!',
    //   });
    //   window.location.href = '/';
    // } else {
    //   await swal({
    //     title: 'Error',
    //     text: response.data.message,
    //     icon: 'error',
    //     button: '😥',
    //   });
    // }

    await swal({
      text: response.data.message,
      button: 'Okay',
    });

    window.location.href = '/';
  };

  useEffect(() => {
    tableBooking();
  }, []);

  return <div></div>;
};

export default BookTable;
