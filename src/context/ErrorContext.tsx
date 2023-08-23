import { createContext, useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { ContextProps } from './ContextProps'
import 'react-toastify/dist/ReactToastify.css'

const ErrorContext = createContext({})

const ErrorToast = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  )
}

const ErrorProvider = ({ children }: ContextProps) => {
  const alertError = (message: string) => {
    toast.error(message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  }

  return (
    <ErrorContext.Provider value={{ alertError }}>
      <ErrorToast />
      {children}
    </ErrorContext.Provider>
  )
}

export const useErrorHandling = (): any => {
  return useContext(ErrorContext)
}

export default ErrorProvider
