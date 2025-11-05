import {useState} from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { Link,useNavigate } from 'react-router';
// import { FcGoogle } from "react-icons/fc";
import { SignUpInfo } from '../../../types';
import { FaEyeSlash,FaEye} from "react-icons/fa";
import { toast,Toaster } from 'sonner';
// import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
// import { auth } from '../../../config/firebaseConfig';
import { 
  useLoginMutation,
  // useGoogleAuthMutation 
} 
  from '../../../api/users/auth';
import { useAppDispatch } from '../../../hooks/hooks';
import { getUserDetails } from '../../../api/userSlice/userSlice';

const Login = () => {
  const [login] = useLoginMutation() 
  // const [googleAuth] = useGoogleAuthMutation()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const dispatch = useAppDispatch()

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpInfo>();
  const onSubmit: SubmitHandler<SignUpInfo> = async(data) =>{
    setDisabled(true)
    try {
    const res = await login(data).unwrap()
      dispatch(getUserDetails(res.data))
    setTimeout(() => {
      setDisabled(false)
    }, 4000);
    navigate('/')
    } catch (error) {
      toast.error(error.data.message)
    }finally{
      setDisabled(false)
    }
    
  };


  // const handleGoogle = async() =>{
  //   setDisabled(true)
  //   try {
  //     const provider = await new GoogleAuthProvider();
  //   const result = await  signInWithPopup(auth, provider);
  //   const res = await googleAuth({
  //     name:result.user.displayName,
  //     email:result.user.email,
  //     // profilePicture: result.user.photoURL
  //   }).unwrap()
  //   toast(res?.data.message)
  //   dispatch(getUserDetails(res.data))
  
  // setTimeout(() => {
  //   setDisabled(false)
  // }, 4000);
  // navigate('/')
  //   } catch (error) {
  //     toast.error(error)
  //     console.log(error.data.message)
      
  //   setDisabled(false)
  //   }finally{
  //     setDisabled(false)
  //   }
    
  // }
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20'></div>
      <div className='absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2'></div>
      <div className='absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2'></div>
      
      <div className='w-full max-w-md relative z-10'>
        <div className='bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 space-y-6'>
          {/* Header */}
          <div className='text-center space-y-3'>
            <div className='w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg'>
              <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
              </svg>
            </div>
            <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>Welcome Back</h1>
            <p className='text-gray-600 text-sm'>Sign in to your account to continue shopping</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            {/* Email Field */}
            <div className='space-y-2'>
              <label htmlFor="email" className='block text-sm font-semibold text-gray-700'>
                Email Address
              </label>
              <input 
                type="email"  
                id='email'
                className='w-full h-12 px-4 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 hover:bg-white/80'
                placeholder='Enter your email'
                {...register('email',{
                  required:"Please enter your email",
                  pattern:{
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format"
                  }
                })}
              />
              {errors.email && (
                <p className='text-sm text-red-500 flex items-center gap-2 bg-red-50/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-red-200/50'>
                  <svg className='w-4 h-4 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                  </svg>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className='space-y-2'>
              <label htmlFor="password" className='block text-sm font-semibold text-gray-700'>
                Password
              </label>
              <div className='relative'>
                <input 
                  type={showPassword ? "text":"password"} 
                  id='password'
                  className='w-full h-12 px-4 pr-12 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 hover:bg-white/80'
                  placeholder='Enter your password'
                  {...register("password",{
                    required:"Please enter your password",
                  })} 
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute w-fit right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600  rounded-lg transition-colors duration-200'
                >
                  {showPassword ? <FaEye className='w-4 h-4' /> : <FaEyeSlash className='w-4 h-4' />}
                </button>
              </div>
              {errors.password && (
                <p className='text-sm text-red-500 flex items-center gap-2 bg-red-50/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-red-200/50'>
                  <svg className='w-4 h-4 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                  </svg>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className='text-right'>
              <Link 
                to="/forgotten-password" 
                className='text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded px-1'
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <button 
              disabled={isDisabled} 
              type='submit' 
              className='w-full h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed'
            >
              {isDisabled ? (
                <div className='flex items-center justify-center gap-3'>
                  <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                <span className='flex items-center justify-center gap-2'>
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' />
                  </svg>
                  Sign In
                </span>
              )}
            </button>

            {/* Sign Up Link */}
            <div className='text-center'>
              <p className='text-gray-600 text-sm'>
                Don't have an account?{' '}
                <Link 
                  to='/register' 
                  className='font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded px-1'
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>

          {/* Divider - Uncomment when Google auth is ready */}
          {/* <div className='flex items-center gap-4'>
            <div className='flex-1 h-px bg-neutral-200'></div>
            <span className='text-sm text-neutral-500'>or</span>
            <div className='flex-1 h-px bg-neutral-200'></div>
          </div> */}

          {/* Google Sign In - Uncomment when ready */}
          {/* <button 
            onClick={handleGoogle} 
            disabled={isDisabled} 
            className='btn-outline btn-lg w-full'
          >
            <FcGoogle className='w-5 h-5 mr-2'/>
            Continue with Google
            {isDisabled && <div className='loader ml-2'></div>}
          </button> */}
        </div>
      </div>
      <Toaster position="top-right"/>
    </div>
  )
}

export default Login