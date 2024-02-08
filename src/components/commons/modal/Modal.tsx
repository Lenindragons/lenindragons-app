/* eslint-disable react/require-default-props */
/* eslint-disable prettier/prettier */
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
`

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`

const CloseButton = styled.button`
  cursor: pointer;
`

type ModalProps = {
  label: string
  isOpen?: boolean
  onClose?: () => void
  children: React.ReactNode
}

export const Modal = ({
  label,
  isOpen = false,
  onClose = () => { },
  children,
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
      <button type="button" onClick={handleOpenModal}>
        {label}
      </button>
    )
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={handleClose}>Fechar</CloseButton>
        <div>{children}</div>
      </ModalContent>
    </ModalOverlay>
  )
}
