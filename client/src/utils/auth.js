export const currentUser =
  JSON.parse(localStorage.getItem('currentUser')) || null;

export const pendingBooking =
  JSON.parse(localStorage.getItem('tableBooking')) || null;
