import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { STORAGE_KEY_PASSWORD, STORAGE_KEY_USER } from '../../constants';
import { userStore } from '../../App';
import { useNavigate } from 'react-router-dom';
import { Avatar, Menu, MenuItem } from '@mui/material';

const MenuAppBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const logout = userStore((state) => state.logout);
  const navigate = useNavigate();

  const handleClose = () => {
    console.log('handleClose')
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_PASSWORD);

    signOut(auth).then(() => {
        navigate('/login')
        logout();
    }).catch((_error) => {
    });
  };

  return (
    <Box sx={{ flexGrow: 1,
    }}>
      <AppBar  position="fixed">
        <Toolbar>
                      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gappnadero v1.0 
          </Typography>
          {(
            <div>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(event)=> setAnchorEl(event.currentTarget)}
                color="inherit"
              >
                <Avatar alt="Travis Howard" src="/cowIcon512.png" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={()=>  setAnchorEl(null)}
              >
                <MenuItem onClick={handleClose}>Cerrar sesión</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MenuAppBar;
