/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-array-index-key */
import { useState } from 'react'
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
  useMediaQuery,
  createTheme,
  ThemeProvider,
  Collapse,
  Divider,
} from '@mui/material'
import {
  Menu as MenuIcon,
  ExitToApp as ExitToAppIcon,
  ScheduleOutlined as ScheduleOutlinedIcon,
  InventoryOutlined as InventoryOutlinedIcon,
  ReceiptLongOutlined as ReceiptLongOutlinedIcon,
  AirplanemodeActiveOutlined as AirplanemodeActiveOutlinedIcon,
  ReceiptOutlined as ReceiptOutlinedIcon,
  PeopleAltOutlined as PeopleAltOutlinedIcon,
} from '@mui/icons-material'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const drawerWidth = 240

export const NewDashboard = ({ children }: { children: any }) => {
  const [open, setOpen] = useState(false)
  const [openCollapsed] = useState(true)
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

  const { logout } = useAuth()
  const navigate = useNavigate()

  const menuItems = [
    {
      text: 'Em Aberto',
      icon: <ReceiptLongOutlinedIcon />,
      onClick: () => navigate('/dashboard/open'),
    },
    {
      text: 'Em Transito',
      icon: <AirplanemodeActiveOutlinedIcon />,
      onClick: () => navigate('/dashboard/transit'),
    },
    {
      text: 'Em Estoque',
      icon: <InventoryOutlinedIcon />,
      onClick: () => navigate('/dashboard/store'),
    },
    {
      text: 'Concluídos',
      icon: <ScheduleOutlinedIcon />,
      onClick: () => navigate('/dashboard/done'),
    },
    {
      text: 'Sair',
      icon: <ExitToAppIcon />,
      onClick: () => logout(),
    },
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
                <ListItem button key={index} onClick={item.onClick}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
              <Divider />
              <ListItem>Admin</ListItem>
              <Divider />
              <Collapse in={openCollapsed} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={Link}
                    to="/dashboard/admin/orders"
                  >
                    <ListItemIcon>
                      <ReceiptOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Pedidos" />
                  </ListItem>
                  <ListItem button component={Link} to="/dashboard/admin/users">
                    <ListItemIcon>
                      <PeopleAltOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Usuários" />
                  </ListItem>
                </List>
              </Collapse>
            </List>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
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
                onClick={item.onClick}
              />
            ))}
          </BottomNavigation>
        )}
      </Box>
    </ThemeProvider>
  )
}
