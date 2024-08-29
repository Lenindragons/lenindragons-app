import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import DraftsIcon from '@mui/icons-material/Drafts'
import { Link } from 'react-router-dom'

export const SideMenu = () => {
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'transparent',
        color: '#fff',
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText>
          <Link to="/dashboard/home">Profile</Link>
        </ListItemText>
      </ListItemButton>
    </List>
  )
}
