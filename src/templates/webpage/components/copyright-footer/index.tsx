import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography, Box } from '@mui/material'

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#333',
    padding: '10px 0',
    width: '100%',
    textAlign: 'center',
    color: '#fff !important',
  },
  copyright: {
    color: '#fff !important',
  },
  address: {
    color: '#fff !important',
  },
  version: {
    marginTop: theme.spacing(1),
    fontStyle: 'italic',
    color: '#fff !important',
  },
}))

const CopyrightFooter = () => {
  const classes = useStyles()

  return (
    <Box className={classes.footer}>
      <Container maxWidth="lg">
        <Typography
          variant="body1"
          color="textSecondary"
          className={classes.copyright}
        >
          &copy; {new Date().getFullYear()} Fantasia Geek Store.
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.address}
        >
          Av. Liberdade, 1925 - Santa Isabel, Viamão - RS, 94480-500
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.version}
        >
          Version: 1.0.0-beta
        </Typography>
      </Container>
    </Box>
  )
}

export default CopyrightFooter
