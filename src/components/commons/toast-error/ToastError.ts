import { toast, ToastOptions, ToastPosition } from 'react-toastify'

const config: ToastOptions<unknown> = {
  position: 'top-center' as ToastPosition,
  theme: 'colored',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
}

export const toastError = (message: string) => {
  toast.error(message, {
    ...config,
  })
}

export const toastSuccess = (message: string) => {
  toast.success(message, {
    ...config,
  })
}
