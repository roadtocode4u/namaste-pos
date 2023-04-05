import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

import { currentUser } from '../../utils/auth';

const BookTableLogic = () => {
  const alreadyCalled = useRef(false);
  const tableBooking = async () => {
    const url = window.location.pathname;
    const tableNumber = url.split('/').pop();
    const userId = currentUser._id;
    console.log(tableNumber);
    const response = await axios.post(`/bookTable/${tableNumber}`, {
      userId: userId,
    });
    console.log(response.data.message);
    console.log(typeof response.data.data.occupied);

    await swal({
      text: response.data.message,
      button: 'Okay',
    });
    window.location.href = '/';
  };

  useEffect(() => {
    if (!alreadyCalled.current) {
      alreadyCalled.current = true;
      tableBooking();
    }
  }, []);

  return <div></div>;
};

export default BookTableLogic;
