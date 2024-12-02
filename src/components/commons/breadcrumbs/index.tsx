/* eslint-disable jsx-a11y/anchor-is-valid */
import { Breadcrumbs, Link, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

const BreadcrumbsNav = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const pathnames = location.pathname
    .split('/')
    .filter((x) => x)
    .filter((x) => x !== 'admin' && x !== 'dashboard')

  const pathnamesDisplayed = location.pathname.split('/').filter((x) => x)

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      <Link color="inherit" onClick={() => navigate('/dashboard/open')}>
        Home
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnamesDisplayed.slice(0, pathnamesDisplayed.length - 1).join('/')}`
        const isLast = index === pathnames.length - 1
        return isLast ? (
          <Typography color="textPrimary" key={to}>
            {value}
          </Typography>
        ) : (
          <Link color="inherit" onClick={() => navigate(to)} key={to}>
            {value}
          </Link>
        )
      })}
    </Breadcrumbs>
  )
}

export default BreadcrumbsNav
