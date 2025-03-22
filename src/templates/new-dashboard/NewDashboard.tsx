/* eslint-disable @typescript-eslint/no-shadow */
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
  EventNote as EventNoteIcon,
  Style as StyleIcon,
  CatchingPokemon as CatchingPokemonIcon,
  ChevronLeft as ChevronLeftIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  BarChart as BarChartIcon,
  NoteAdd as NoteAddIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import {
  allowedAdmin,
  allowedAdminJudge,
  allowedAdminOrganizer,
  allowedAdminOrganizerJudge,
  allowedAll
} from '@/helpers/permissions'

const drawerWidth = 240

interface NewDashboardProps {
  children: React.ReactNode
}

const NewDashboard: React.FC<NewDashboardProps> = ({ children }) => {
  const { user } = useAuth()
  const [open, setOpen] = useState(true)
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('isDarkTheme') === 'true'
  )
  const theme = useTheme()

  const handleDrawerToggle = () => {
    setOpen(!open)
  }

  const menuItems = [
    {
      text: 'Perfil',
      icon: <AccountCircleIcon />,
      url: 'profile',
      permission: allowedAll,
    },
    {
      text: 'Relatório',
      icon: <BarChartIcon />,
      url: 'analytics-report',
      permission: allowedAdminOrganizer,
    },
    {
      text: 'Torneios',
      icon: <EventNoteIcon />,
      url: 'seasons',
      permission: allowedAdminOrganizerJudge,
    },
    {
      text: 'Decks',
      icon: <StyleIcon />,
      url: 'decks',
      permission: allowedAdminJudge,
    },
    {
      text: 'Jogadores',
      icon: <CatchingPokemonIcon />,
      url: 'players',
      permission: allowedAdminJudge,
    },
    {
      text: 'Atividades',
      icon: <NoteAddIcon />,
      url: 'achievements-manager',
      permission: allowedAdminOrganizer,
    },
    {
      text: 'Configurações',
      icon: <SettingsIcon />,
      url: 'settings',
      permission: allowedAdmin,
    },
  ]

  const handleThemeToggle = () => {
    setDarkMode(!darkMode)
    localStorage.setItem('isDarkTheme', JSON.stringify(!darkMode))
  }

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: '#f1f1f1',
      },
      primary: {
        main: '#d097c1',
      },
      secondary: {
        main: '#395184',
      },
      error: {
        main: '#e6125d',
      },
      text: {
        primary: '#000',
      },
      success: {
        main: '#a07494',
      }
    },
  })

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      text: {
        primary: '#f5f5f5',
      },
      primary: {
        main: '#d097c1',
      },
    },
  })

  const appliedTheme = darkMode ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={appliedTheme}>
      <Box
        sx={{
          display: 'flex',
        }}
      >
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
              {import.meta.env.VITE_SITE_NAME}
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
              <Avatar alt={user.name} src={user.image} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            width: open ? drawerWidth : `calc(${theme.spacing(9)} + 1px)`,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: open ? drawerWidth : `calc(${theme.spacing(9)} + 1px)`,
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
              {menuItems
                .filter((item) => item.permission.includes(user.type))
                .map((item, index) => (
                  <Link
                    to={`/${item.url}`}
                    key={index}
                    style={{ textDecoration: 'none' }}
                  >
                    <ListItem
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        ':hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        },
                      }}
                    >
                      <ListItemIcon sx={{ svg: { fontSize: '38px' } }}>
                        {item.icon}
                      </ListItemIcon>
                      {open && (
                        <ListItemText
                          disableTypography
                          sx={{
                            color: (theme) => theme.palette.text.primary,
                            fontSize: '18px',
                            textTransform: 'uppercase',
                          }}
                          primary={item.text}
                        />
                      )}
                    </ListItem>
                    <Divider />
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
