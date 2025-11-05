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
import { persistor } from '../store'
import { logout } from '../api/userSlice/userSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { resetQuantity } from '../api/quatitySlice/quantitySlice';
import { useNavigate, useLocation } from 'react-router';

type avatarProp = {
  name?: string,
  src?: string,
  isSeller?: boolean
}

export default function AccountMenu({ name, src }: avatarProp) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [logoutMutation] = useLogoutMutation()
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
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
      handleClose()
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  const seller = () => {
    user?.isSeller ? navigate('/dashboard') : navigate('/plans')
    handleClose()
  }

  const orderPage = () => {
    navigate(`/user/order/${user._id}`)
    handleClose()
  }

  const goHome = () => {
    navigate('/')
    handleClose()
  }

  const navigateToWishList = () => {
    navigate(`/user/wishlist/${user._id}`)
    handleClose()
  }

  function stringAvatar(name: string | undefined) {
    if (!name) return { children: '??' };
    const parts = name.split(' ');
    return {
      children: `${parts[0][0]}${parts[1]?.[0] ?? ''}`,
    };
  }

  return (
    <div className="relative">
      <Tooltip title="Account settings">
        <button
          onClick={handleClick}
          className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-0.5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group"
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <div className="w-full h-full bg-white rounded-xl flex items-center justify-center overflow-hidden">
            {src ? (
              <img
                src={src}
                alt={name}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <span className="text-sm font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {stringAvatar(name).children}
              </span>
            )}
          </div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </Tooltip>

      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100/50 py-3 z-50 transform transition-all duration-300 ease-out scale-100 opacity-100">
          {/* User Info Section */}
          <div className="px-6 py-4 border-b border-gray-100/50">
            <div className="flex items-center space-x-4">
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-0.5">
                  <div className="w-full h-full bg-white rounded-xl flex items-center justify-center overflow-hidden">
                    {src ? (
                      <img
                        src={src}
                        alt={name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <span className="text-lg font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {stringAvatar(name).children}
                      </span>
                    )}
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-semibold text-gray-900 truncate">
                  {name || 'User'}
                </h4>
                <p className="text-sm text-gray-500 truncate flex items-center">
                  <span className={`w-2 h-2 rounded-full mr-2 ${user?.isSeller ? 'bg-purple-500' : 'bg-blue-500'}`}></span>
                  {user?.isSeller ? 'Seller Account' : 'Buyer Account'}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button
              onClick={handleClose}
              className="flex items-center w-full px-6 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-gray-900 transition-all duration-200 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 group-hover:from-blue-200 group-hover:to-blue-300 rounded-xl flex items-center justify-center mr-4 transition-all duration-200">
                <span className="text-lg">👤</span>
              </div>
              <div className="text-left">
                <p className="font-medium">Profile</p>
                <p className="text-xs text-gray-500">View and edit profile</p>
              </div>
            </button>

            <button
              onClick={navigateToWishList}
              className="flex items-center w-full px-6 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-red-50 hover:text-gray-900 transition-all duration-200 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-red-200 group-hover:from-pink-200 group-hover:to-red-300 rounded-xl flex items-center justify-center mr-4 transition-all duration-200">
                <span className="text-lg">❤️</span>
              </div>
              <div className="text-left">
                <p className="font-medium">Wishlist</p>
                <p className="text-xs text-gray-500">Saved items</p>
              </div>
            </button>

            <button
              onClick={orderPage}
              className="flex items-center w-full px-6 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-gray-900 transition-all duration-200 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-200 group-hover:from-green-200 group-hover:to-emerald-300 rounded-xl flex items-center justify-center mr-4 transition-all duration-200">
                <span className="text-lg">📦</span>
              </div>
              <div className="text-left">
                <p className="font-medium">Orders</p>
                <p className="text-xs text-gray-500">Track your orders</p>
              </div>
            </button>

            <button
              onClick={seller}
              className="flex items-center w-full px-6 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 hover:text-gray-900 transition-all duration-200 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-indigo-200 group-hover:from-purple-200 group-hover:to-indigo-300 rounded-xl flex items-center justify-center mr-4 transition-all duration-200">
                <span className="text-lg">{user?.isSeller ? '📊' : '🏪'}</span>
              </div>
              <div className="text-left">
                <p className="font-medium">{user?.isSeller ? 'Dashboard' : 'Become a Seller'}</p>
                <p className="text-xs text-gray-500">{user?.isSeller ? 'Manage your store' : 'Start selling today'}</p>
              </div>
            </button>

            {!pathname.includes('dashboard') && !pathname.includes('seller') && (
              <button
                onClick={goHome}
                className="flex items-center w-full px-6 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 hover:text-gray-900 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-yellow-200 group-hover:from-orange-200 group-hover:to-yellow-300 rounded-xl flex items-center justify-center mr-4 transition-all duration-200">
                  <span className="text-lg">🏠</span>
                </div>
                <div className="text-left">
                  <p className="font-medium">Go to Homepage</p>
                  <p className="text-xs text-gray-500">Browse products</p>
                </div>
              </button>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100/50 my-2"></div>

          {/* Additional Actions */}
          <div className="py-2">
            <button
              onClick={handleClose}
              className="flex items-center w-full px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
            >
              <PersonAdd className="w-5 h-5 mr-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
              <span className="font-medium">Add another account</span>
            </button>

            <button
              onClick={handleClose}
              className="flex items-center w-full px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
            >
              <Settings className="w-5 h-5 mr-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
              <span className="font-medium">Settings</span>
            </button>

            <button
              onClick={logOut}
              className="flex items-center w-full px-6 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group rounded-b-3xl"
            >
              <Logout className="w-5 h-5 mr-4 text-red-500 group-hover:text-red-600 transition-colors duration-200" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
