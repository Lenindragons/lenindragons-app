/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-key */
import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Badge,
  CssBaseline,
  Typography,
  Box,
  Divider,
  useTheme,
  createTheme,
  ThemeProvider,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  SportsEsports as SportsEsportsIcon,
  Deck as DeckIcon,
  People as PeopleIcon,
  ChevronLeft as ChevronLeftIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from '@mui/icons-material'
import { Link } from 'react-router-dom'

const drawerWidth = 240

interface NewDashboardProps {
  children: React.ReactNode
}

const NewDashboard: React.FC<NewDashboardProps> = ({ children }) => {
  const [open, setOpen] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const theme = useTheme()

  const handleDrawerToggle = () => {
    setOpen(!open)
  }

  const menuItems = [
    { text: 'Perfil', icon: <AccountCircleIcon />, url: 'profile' },
    { text: 'Torneios', icon: <SportsEsportsIcon />, url: 'seasons' },
    { text: 'Decks', icon: <DeckIcon />, url: 'decks' },
    { text: 'Jogadores', icon: <PeopleIcon />, url: 'players' },
  ]

  const handleThemeToggle = () => {
    setDarkMode(!darkMode)
  }

  const appliedTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  })

  return (
    <ThemeProvider theme={appliedTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ marginRight: 2 }}
            >
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Dashboard
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton color="inherit" onClick={handleThemeToggle}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            width: open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
              transition: (theme) =>
                theme.transitions.create('width', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
              overflowX: 'hidden',
            },
          }}
        >
          <Toolbar />
          <Divider />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {menuItems.map((item, index) => (
                <Link to={`/${item.url}`} key={index}>
                  <ListItem>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    {open && <ListItemText primary={item.text} />}
                  </ListItem>
                </Link>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box component="main" style={{ width: '100%' }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default NewDashboard
