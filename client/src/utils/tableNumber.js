import swal from 'sweetalert';

export const tableNumber =
  JSON.parse(localStorage.getItem('tableNumber')) || null;

  export async function featchtableNumber() {
    if (!tableNumber) {
      await swal({
        title: 'Table Booking Required',
        text: 'Please Booked Table to continue',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      });
      window.location.href = '/';
    }
  }