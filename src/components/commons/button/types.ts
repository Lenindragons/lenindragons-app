import { ReactNode } from 'react'

export type ButtonProps = {
  children: ReactNode
  onClick: (e: any) => void
  type?: string
}
