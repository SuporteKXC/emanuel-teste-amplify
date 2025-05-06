import { toast } from 'react-toastify';

export function notify(type: 'error' | 'success', message: string, toastId?: number | string ): void {
  if (type === 'error') {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      className: 'toasterror',
      toastId: toastId ?? ""
    });
  }
  if (type === 'success') {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      className: 'toastsuccess',
    });
  }
}
