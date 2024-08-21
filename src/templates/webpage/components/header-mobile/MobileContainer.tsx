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
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { makeStyles } from '@material-ui/core/styles'

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

const MobileHeader = () => {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = useState(false)

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
        <ListItem button>
          <ListItemText primary="Rankings" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Torneios" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Regras" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Cadastre-se" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Login" />
        </ListItem>
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
            <Typography variant="h6" className={classes.title}>
              Fantasia Geek Store
            </Typography>
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
