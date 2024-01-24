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
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [user, setUser] = React.useState<string | null>()

  React.useEffect(()=>{
    setUser(localStorage.getItem('email'))
  },[localStorage.getItem('email')])

  const navigate = useNavigate();

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
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
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
                {user ? <>
                <MenuItem key={'cars'} onClick={()=>{handleCloseNavMenu(); navigate('/Cars');}}>
                  <Typography textAlign="center">Cars</Typography>
                </MenuItem>
                <MenuItem key={'models'} onClick={()=>{handleCloseNavMenu(); navigate('/Models');}}>
                  <Typography textAlign="center">Models</Typography>
                </MenuItem>
                <MenuItem key={'brands'} onClick={()=>{handleCloseNavMenu(); navigate('/Brands');}}>
                  <Typography textAlign="center">Brands</Typography>
                </MenuItem>
                <MenuItem key={'transmission'} onClick={()=>{handleCloseNavMenu(); navigate('/Transmissions');}}>
                  <Typography textAlign="center">Transmissions</Typography>
                </MenuItem>
                <MenuItem key={'fuelType'} onClick={()=>{handleCloseNavMenu(); navigate('/FuelTypes');}}>
                  <Typography textAlign="center">Fuel Types</Typography>
                </MenuItem>
                </>
                : 
                <>
                <MenuItem key={'login'} onClick={()=>{handleCloseNavMenu(); navigate('/Login');}}>
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
                <MenuItem key={'register'} onClick={()=>{handleCloseNavMenu(); navigate('/Register');}}>
                  <Typography textAlign="center">Register</Typography>
                </MenuItem>
                </>}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>       
              {user ? <>
              <Button
                key={'cars'}
                onClick={()=>{handleCloseNavMenu(); navigate('/Cars');}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Cars
              </Button>
              <Button
                key={'models'}
                onClick={()=>{handleCloseNavMenu(); navigate('/Models');}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Models
              </Button> 
              <Button
                key={'brands'}
                onClick={()=>{handleCloseNavMenu(); navigate('/Brands');}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Brands
              </Button> 
              <Button
                key={'transmission'}
                onClick={()=>{handleCloseNavMenu(); navigate('/Transmissions');}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Transmissions
              </Button> 
              <Button
                key={'fuelType'}
                onClick={()=>{handleCloseNavMenu(); navigate('/FuelTypes');}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Fuel Types
              </Button>
              </>
              :
              <>
              <Button
                key={'login'}
                onClick={()=>{handleCloseNavMenu(); navigate('/Login');}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Login
              </Button>
              <Button
                key={'register'}
                onClick={()=>{handleCloseNavMenu(); navigate('/Register');}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Register
              </Button>
              </>
              }
          </Box>
          {user && <><span className='mr-10'>Hello, {user}</span>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
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
                <MenuItem key='logout' onClick={
                  ()=> {
                          localStorage.clear();
                          navigate('/Login');
                  }
                }>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
          </Box></>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;