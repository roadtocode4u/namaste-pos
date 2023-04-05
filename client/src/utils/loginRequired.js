import swal from 'sweetalert';
import { currentUser } from './auth';

export async function loginRequired() {
  if (!currentUser) {
    await swal({
      title: 'Login Required',
      text: 'Please login to continue',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    });
    window.location.href = '/';
  }
}
