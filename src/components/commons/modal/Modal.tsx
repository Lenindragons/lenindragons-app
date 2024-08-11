/* eslint-disable react/require-default-props */
/* eslint-disable prettier/prettier */
import { Button } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'

// Estilos do Modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`

const ModalContent = styled.div`
  background-color: white;
  min-width: 300px;
  min-height: 200px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`

const CloseButton = styled.button`
  cursor: pointer;
  padding: 10px;
  margin-bottom: 10px;
`

type ModalProps = {
  label: string
  isOpen?: boolean
  onClose?: () => void
  children: React.ReactNode
  variant?: 'contained' | 'outlined' | 'text'
  color?: 'primary' | 'secondary' | 'default'
}

export const Modal = ({
  label,
  isOpen = false,
  onClose = () => { },
  children,
  variant = 'contained',
  color = 'primary',
}: ModalProps) => {
  const [modalOpen, setModalOpen] = useState(isOpen)

  const handleClose = () => {
    setModalOpen(false)
    onClose()
  }

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  if (!modalOpen) {
    return (
      <Button variant={variant} color={color as 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'} onClick={handleOpenModal}>
        {label}
      </Button>
    )
  }

  return (
    <>
      <Button variant={variant} color={color as 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'}>
        {label}
      </Button>
      <ModalOverlay>
        <ModalContent>
          <CloseButton onClick={handleClose}>Fechar</CloseButton>
          <div>{children}</div>
        </ModalContent>
      </ModalOverlay>
    </>
  )
}
