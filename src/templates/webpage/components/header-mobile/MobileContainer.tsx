/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ThemeProvider,
  createTheme,
  Grid,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
}))

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const Login = () => {
  const { signInGoogle } = useAuth()
  return (
    <ListItem>
      <a
        href="#"
        onClick={signInGoogle}
        style={{ color: 'white', textDecoration: 'none' }}
      >
        Login
      </a>
    </ListItem>
  )
}

const Logout = () => {
  const { logout } = useAuth()
  return (
    <ListItem>
      <a
        href="#"
        onClick={logout}
        style={{ color: 'white', textDecoration: 'none' }}
      >
        Sair
      </a>
    </ListItem>
  )
}

const MobileHeader = () => {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { user } = useAuth()

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }
      setDrawerOpen(open)
    }

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            <ListItemText primary="Home" />
          </Link>
        </ListItem>
        <ListItem>
          <Link
            to="/ranking"
            style={{ color: 'white', textDecoration: 'none' }}
          >
            <ListItemText primary="Rankings" />
          </Link>
        </ListItem>
        <ListItem>
          <Link
            to="/challenges"
            style={{ color: 'white', textDecoration: 'none' }}
          >
            <ListItemText primary="Torneios" />
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/rules" style={{ color: 'white', textDecoration: 'none' }}>
            <ListItemText primary="Regras" />
          </Link>
        </ListItem>
        <Divider />
        {user ? (
          <>
            <ListItem>
              <Link
                style={{ color: 'white', textDecoration: 'none' }}
                to="/profile"
              >
                <ListItemText primary="Acessar plataforma" />
              </Link>
            </ListItem>
            <Logout />
          </>
        ) : (
          <>
            <ListItem>Cadastre-se</ListItem>
            <Login />
          </>
        )}
      </List>
    </div>
  )

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography variant="h6" className={classes.title}>
                Fantasia Geek Store
              </Typography>
              <Typography
                variant="h6"
                style={{ textAlign: 'right' }}
                className={classes.title}
              >
                <Link
                  style={{ color: 'white', textDecoration: 'none' }}
                  to="/profile"
                >
                  Olá, {user && user.name}
                </Link>
              </Typography>
            </Grid>
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </div>
    </ThemeProvider>
  )
}

export default MobileHeader
