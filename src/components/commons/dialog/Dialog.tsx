/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

type DialogComponentProps = {
  onClose: () => void
  onConfirm: () => void
}

const DialogComponent = ({ onClose, onConfirm }: DialogComponentProps) => {
  return (
    <Dialog
      open
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Você tem certeza?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Deseja confirmar os resultados?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="secondary" autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogComponent
