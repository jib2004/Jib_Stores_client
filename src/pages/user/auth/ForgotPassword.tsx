import {useState} from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { Link,useNavigate } from 'react-router';
import { SignUpInfo } from '../../../types';
import { toast,Toaster } from 'sonner';
import { useSendOTPMutation } from '../../../api/users/auth';

const ForgotPassword = () => {
  const [sendOtp,{isLoading}] = useSendOTPMutation() 
  const navigate = useNavigate()
  const [isDisabled, setDisabled] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpInfo>();
  const onSubmit: SubmitHandler<SignUpInfo> = async(data) =>{
    setDisabled(true) 
    try {
      const res = await sendOtp(data).unwrap()
      localStorage.setItem("email",data.email)
      toast(res?.data.message)
      setTimeout(() => {
        setDisabled(false)
      }, 4000);
      navigate('/verify-otp-password')
    } catch (error: any) {
      toast.error(error.data.message)
    }finally{
      setDisabled(false)
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4'>
            <svg className='w-8 h-8 text-primary-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z' />
            </svg>
          </div>
          <h1 className='heading-2 text-2xl text-neutral-900 mb-2'>Forgot Password?</h1>
          <p className='body-medium text-neutral-600'>No worries, we'll send you reset instructions.</p>
        </div>

        {/* Form Card */}
        <div className='card p-6 sm:p-8'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-4'>
              <div className='form-group'>
                <label htmlFor="email" className='form-label'>
                  Email Address
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <svg className='h-5 w-5 text-neutral-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207' />
                    </svg>
                  </div>
                  <input 
                    type="email"  
                    id='email'
                    className='form-input pl-10'
                    placeholder='Enter your email address'
                    {...register('email',{
                      required:"Please enter your email",
                      pattern:{
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email format"
                      }
                    })}
                  />
                </div>
                {errors.email && (
                  <div className='form-error'>
                    <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                    </svg>
                    {errors.email.message}
                  </div>
                )}
              </div>

              <div className='bg-warning-50 border border-warning-200 rounded-xl p-4'>
                <div className='flex items-start gap-3'>
                  <svg className='w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                  </svg>
                  <div>
                    <p className='body-small font-medium text-warning-800 mb-1'>Check your spam folder</p>
                    <p className='body-small text-warning-700'>If you don't receive the email, please check your spam or junk folder.</p>
                  </div>
                </div>
              </div>
            </div>

            <button 
              disabled={isDisabled} 
              type='submit' 
              className='btn-primary w-full flex items-center justify-center gap-2'
            >
              {isDisabled ? (
                <>
                  <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                  Sending...
                </>
              ) : (
                <>
                  Send Reset Instructions
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8' />
                  </svg>
                </>
              )}
            </button>

            <div className='text-center'>
              <Link 
                to={'/login'} 
                className='inline-flex items-center gap-2 body-medium text-neutral-600 hover:text-primary-600 transition-colors duration-200'
              >
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
                </svg>
                Back to login
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Toaster position='top-right'/>
    </div>
  )
}

export default ForgotPassword