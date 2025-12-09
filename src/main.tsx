import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter,RouterProvider } from "react-router";
import { Home } from './pages/user/Home.tsx';
import Login from './pages/user/auth/Login.tsx';
import SignUp from './pages/user/auth/SignOut.tsx';

import { store,persistor } from './store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import ForgotPassword from './pages/user/auth/ForgotPassword.tsx';
import VerifyPasswordOtp from './pages/user/auth/VerifyPasswordOtp.tsx';
import ChangePassword from './pages/user/auth/ChangePassword.tsx';
import SellerPlan from './pages/user/seller/SellerPlan.tsx';
import SellerDashboard from './pages/user/seller/SellerDashboard.tsx';
import SellerProducts from './pages/user/seller/SellerProducts.tsx';
import AddProduct from './pages/user/seller/AddProduct.tsx';
import ConfirmSubscription from './pages/user/seller/ConfirmSubscription.tsx';
import UpdateProduct from './pages/user/seller/UpdateProduct.tsx';
import Review from './pages/user/seller/Review.tsx';
import GetProductInfo from './pages/user/GetProductInfo.tsx';
import Wishlist from './pages/user/Wishlist.tsx';
import CartPage from './pages/user/CartPage.tsx';
import CheckOutPage from './pages/user/CheckOutPage.tsx';
import OrderPage from './pages/user/OrderPage.tsx';
import SearchPage from './pages/user/SearchPage.tsx';



const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    },
    {
      path: '/register',
      element: <SignUp/>,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path:'/forgotten-password',
      element:<ForgotPassword/>,
    },
    {
      path: '/verify-otp-password',
      element:<VerifyPasswordOtp/>
    },
    {
      path:"/change-password",
      element:<ChangePassword/>
    },
    {
      path:'/user/product/:id',
      element:<GetProductInfo />
    },
    {
      path:'/user/wishlist/:id',
      element:<Wishlist/>
    },
    {
      path:'/user/order/:id',
      element:<OrderPage/>
    },
    {
      path:'/user/checkout/:id',
      element:<CheckOutPage/>
    },
    {
      path:"/user/cart/:id",
      element:<CartPage/>
    },
    {
      path: '/plans',
      element: <SellerPlan />,
    },
    {
      'path':'/dashboard',
      'element':<SellerDashboard/>
    },
    {
      'path':'/seller/product/:id',
      'element':<SellerProducts/>
    },
    {
      path: '/seller/product/add',
      element: <AddProduct />,
    },
    {
      path:'/seller/product/review/:id',
      element:<Review/>
    },
    {
      path:'/seller/product/update/:sellerId/:id',
      element:<UpdateProduct/>
    },
    {
      path: '/subscription-confirmation',
      element:<ConfirmSubscription/>
    },
    {
      path: '/search/:query',
      element:<SearchPage/>
    }
    ,
    {
      path: '*',
      element: <div className='flex justify-center items-center h-screen'>
        <h1 className='text-3xl font-bold'>404 - Page Not Found</h1>
      </div>
    }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PersistGate persistor={persistor}>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
    </PersistGate>
  </StrictMode>,
)
