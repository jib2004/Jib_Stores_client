import logo from '../assets/img/a_design_text_logo_for_jibstores_black-removebg-preview.png'
import { Link, useLocation } from 'react-router'
import Cart from '../components/Cart'
import AccountMenu from './Avatar'
import NotSignedIn from './NotSignedIn'
import { useAppSelector } from '../hooks/hooks'

const Navbar = () => {
  const user = useAppSelector(state => state.user)
  const { pathname } = useLocation()

  return (
    <nav className='sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-xl shadow-lg'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <figure className='flex-shrink-0'>
            <Link
              to={pathname.includes("/seller") || pathname.includes("/dashboard") ? '/dashboard' : "/"}
              className='flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-2xl p-2 transition-all duration-200'
            >
              <div className='relative'>
                <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-0.5 shadow-lg group-hover:shadow-xl transition-all duration-300'>
                  <div className='w-full h-full bg-white rounded-xl flex items-center justify-center'>
                    <img
                      src={logo}
                      alt="Jib Stores Logo"
                      className='h-8 w-auto transition-transform duration-200 group-hover:scale-110'
                    />
                  </div>
                </div>
                <div className='absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-sm animate-pulse'></div>
              </div>
              <div className='hidden sm:block'>
                <h1 className='text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>
                  Jib Stores
                </h1>
                <p className='text-xs text-gray-500 -mt-1'>Premium Shopping</p>
              </div>
            </Link>
          </figure>

          {/* Search Bar - Hidden on mobile, shown on larger screens */}
          <div className='hidden md:flex flex-1 max-w-2xl mx-8'>
            <div className='relative w-full group'>
              <div className='absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Search for amazing products...'
                  className='w-full h-12 pl-12 pr-6 bg-gray-50/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/90 transition-all duration-300 shadow-sm hover:shadow-md'
                />
                <div className='absolute inset-y-0 right-4 pl-4 flex items-center pointer-events-none'>
                  <svg className='h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                  </svg>
                </div>
                {/* <button className='absolute  inset-y-0 right-0 pr-3 flex items-center'>
                  <div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105'>
                    <svg className='h-4 w-4 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                    </svg>
                  </div>
                </button> */}
              </div>
            </div>
          </div>

          {/* Right side actions */}
          <div className='flex items-center gap-3 sm:gap-6'>
            {user?.name && (
              <div className='hidden sm:block'>
                <div className='text-right'>
                  <p className='text-sm font-medium text-gray-700'>
                    Welcome back,
                  </p>
                  <p className='text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                    {user.name}
                  </p>
                </div>
              </div>
            )}

            <div className='flex items-center'>
              {user.email ? (
                <AccountMenu
                  name={user?.name || undefined}
                  src={user?.profilePicture || undefined}
                  isSeller={user?.isSeller}
                />
              ) : (
                <NotSignedIn />
              )}
            </div>

            {/* Cart */}
            <div className='flex items-center'>
              <Cart id={user?._id} cart={user.cart?.length} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar