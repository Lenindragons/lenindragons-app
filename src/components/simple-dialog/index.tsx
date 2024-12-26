import * as React from 'react'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import { DialogContent, IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'

const emails = ['username@gmail.com', 'user02@gmail.com']

export interface SimpleDialogProps {
  open: boolean
  selectedValue: string
  onClose: (value: string) => void
  children: React.ReactNode
  title: string
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open, children, title } = props

  const handleClose = () => {
    onClose(selectedValue)
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {title}
      </DialogTitle>
      <IconButton
        aria-label="fechar"
        onClick={handleClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <Close />
      </IconButton>

      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  )
}

export default function SimpleDialogComponent({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(emails[1])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (value: string) => {
    setOpen(false)
    setSelectedValue(value)
  }

  return (
    <>
      <Button
        sx={{ width: '100%', height: '100%' }}
        variant="contained"
        color="success"
        onClick={handleClickOpen}
      >
        {title}
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        title={title}
      >
        {children}
      </SimpleDialog>
    </>
  )
}
