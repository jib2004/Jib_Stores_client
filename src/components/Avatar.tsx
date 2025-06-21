import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import { useLogoutMutation } from '../api/users/auth';
import {persistor} from '../store' 
import { logout } from '../api/userSlice/userSlice';
import { useAppDispatch,useAppSelector } from '../hooks/hooks';
import { resetQuantity } from '../api/quatitySlice/quantitySlice';
import {  useNavigate,useLocation } from 'react-router';

type  avatarProp ={
  name?: string ,
  src?: string,
  isSeller?:boolean

}

export default function AccountMenu({name,src}:avatarProp) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate()
  const [logoutMutation] = useLogoutMutation()
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const {pathname} = useLocation() 
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

   async function logOut() {
    
    try {
      await logoutMutation('').unwrap();
      dispatch(logout())
      persistor.purge()
      dispatch(resetQuantity())
      setAnchorEl(null)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
    
    
  }


  const seller = () =>{
    const users =  user.isSeller ? navigate('/dashboard') : navigate('/plans')
    setAnchorEl(null)
    return users
  }

  const orderPage = () =>{
    navigate(`/user/order/${user._id}`)
    setAnchorEl(null)
  }

  const goHome = () =>{
    navigate('/')
    setAnchorEl(null)
  }

  const navigateToWishList = () =>{
    navigate(`/user/wishlist/${user._id}`)
    setAnchorEl(null)
  }


  function stringAvatar(name: string | undefined) {
    if(name) return `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
  }


  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
   
        <Tooltip title="">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 35, height: 35 }} alt='user profile picture' src={src ? src : ''}>{!src ?stringAvatar(name) : '' }</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
           Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
           My account
        </MenuItem>

        <MenuItem onClick={navigateToWishList}>
           Wishlist
        </MenuItem>

        <MenuItem onClick={orderPage}>
           Orders
        </MenuItem>

        <MenuItem onClick={seller}>
           {user.isSeller ? 'Dashboard' :  'Register to be a seller'}
        </MenuItem>

        {!pathname.includes('dashboard') || !pathname.includes('seller') && 
        <MenuItem onClick={goHome}>
        Go to homepage 
        </MenuItem>
        }
        
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={logOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
