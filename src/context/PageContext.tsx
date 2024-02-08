import { createContext, useContext, useState } from 'react'
import { ContextProps } from './ContextProps'

const PageContext = createContext({})

export const PageProvider = ({ children }: ContextProps) => {
  const [title, setTitle] = useState('')

  return (
    <PageContext.Provider value={{ title, setTitle }}>
      {children}
    </PageContext.Provider>
  )
}

export const usePage = (): any => {
  return useContext(PageContext)
}
