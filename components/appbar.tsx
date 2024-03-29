/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MoneyIcon from '@mui/icons-material/Money';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Link from 'next/link';

const pages = ['Home', 'Analytics'];
const settings = ['Profile', 'Logout'];

const ResponsiveAppBarInformation = ({ user }) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position='sticky'
      color='inherit'
      sx={{ backgroundColor: '#009879', color: 'white' }}
    >
      {' '}
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <MoneyIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Expense Tracking
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  {/* manually specifying routes for now */}
                  {index === 0 && (
                    <Link
                      href='/'
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      <Typography textAlign='center'>{page}</Typography>
                    </Link>
                  )}
                  {index > 0 && (
                    <Link
                      href='/analytics'
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      <Typography textAlign='center'>{page}</Typography>
                    </Link>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <MoneyIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            component='a'
            href='/'
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              fontSize: '15px',
            }}
          >
            Expense Tracking
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {' '}
                {/* manually specifying routes for now */}
                {index === 0 && (
                  <Link
                    href='/'
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    <Typography textAlign='center'>{page}</Typography>
                  </Link>
                )}
                {index > 0 && (
                  <Link
                    href='/analytics'
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    <Typography textAlign='center'>{page}</Typography>
                  </Link>
                )}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user ? (
                  <Avatar alt={user?.name} src={user?.picture} />
                ) : (
                  <AccountCircleIcon
                    sx={{
                      color: 'white',
                    }}
                  />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  {setting === 'Profile' && (
                    <Link
                      href='/profile'
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      <Typography textAlign='center'>{setting}</Typography>
                    </Link>
                  )}
                  {setting === 'Logout' && (
                    <Typography textAlign='center'>
                      <a
                        style={{ textDecoration: 'none', color: 'black' }}
                        href='/api/auth/logout'
                      >
                        Logout
                      </a>
                    </Typography>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const ResponsiveAppBar = ({ user }) => {
  // if (user == null) {
  //   return null;
  // }

  return <ResponsiveAppBarInformation user={user} />;
};
export default ResponsiveAppBar;
