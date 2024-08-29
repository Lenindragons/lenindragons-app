/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-array-index-key */
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
  CssBaseline,
  Typography,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  useTheme,
  useMediaQuery,
  createTheme,
  ThemeProvider,
} from '@mui/material'
import {
  Menu as MenuIcon,
  ExitToApp as ExitToAppIcon,
  ScheduleOutlined as ScheduleOutlinedIcon,
  InventoryOutlined as InventoryOutlinedIcon,
  ReceiptLongOutlined as ReceiptLongOutlinedIcon,
  AirplanemodeActiveOutlined as AirplanemodeActiveOutlinedIcon,
} from '@mui/icons-material'

const drawerWidth = 240

const NewDashboard = ({ children }: { children: any }) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(0)
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  })
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleDrawerToggle = () => {
    setOpen(!open)
  }

  const menuItems = [
    { text: 'Em Aberto', icon: <ReceiptLongOutlinedIcon /> },
    { text: 'Em Transito', icon: <AirplanemodeActiveOutlinedIcon /> },
    { text: 'Em Estoque', icon: <InventoryOutlinedIcon /> },
    { text: 'Concluídos', icon: <ScheduleOutlinedIcon /> },
    { text: 'Sair', icon: <ExitToAppIcon /> },
  ]

  return (
    <ThemeProvider theme={theme}>
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
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Omotenashi Store
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={open}
          onClose={handleDrawerToggle}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {menuItems.map((item, index) => (
                <ListItem button key={index}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginLeft: isMobile ? 0 : drawerWidth,
            transition: (theme) =>
              theme.transitions.create(['margin-left', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
          }}
        >
          <Toolbar />
          {children}
        </Box>
        {isMobile && (
          <BottomNavigation
            value={value}
            onChange={(_event, newValue) => {
              setValue(newValue)
            }}
            showLabels
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: theme.zIndex.drawer + 1,
            }}
          >
            {menuItems.map((item, index) => (
              <BottomNavigationAction
                key={index}
                label={item.text}
                icon={item.icon}
              />
            ))}
          </BottomNavigation>
        )}
      </Box>
    </ThemeProvider>
  )
}

export default NewDashboard
