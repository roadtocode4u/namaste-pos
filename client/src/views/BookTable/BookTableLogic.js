import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

import { currentUser } from '../../utils/auth';
import { loginRequired } from '../../utils/loginRequired';

const BookTableLogic = () => {
  const alreadyCalled = useRef(false);
  const tableBooking = async () => {
    const url = window.location.pathname;
    localStorage.setItem('tableBooking', JSON.stringify(url));
    const tableNumber = url.split('/').pop();
    const userId = currentUser._id;
    const response = await axios.post(`/bookTable/${tableNumber}`, {
      userId: userId,
    });

    await swal({
      text: response.data.message,
      button: 'Okay',
    });
    window.location.href = '/';

    if (response.data.data.occupied) {
      localStorage.removeItem('tableBooking');
    }
  };

  useEffect(() => {
    loginRequired();
    if (!alreadyCalled.current) {
      alreadyCalled.current = true;
      tableBooking();
    }
  }, []);

  return <div></div>;
};

export default BookTableLogic;
