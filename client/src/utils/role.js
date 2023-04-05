import Swal from 'sweetalert2';

export const isAdmin = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  return currentUser?.role === 'admin';
};

export const restrictAccessIfNotAdmin = () => {
  if (!isAdmin()) {
    Swal.fire({
      icon: 'error',
      title: 'Access Denied',
      text: 'कुत्ते कमीने एडमिन पैनल में घुसने की कोशिश मत करो 🦁 मार डालूंगा 🔫',
      confirmButtonText: 'OK',
    }).then(() => {
      window.location.href = '/';
    });
  }
};
