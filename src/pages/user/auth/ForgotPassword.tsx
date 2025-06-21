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
    console.log(isLoading)
   
  
  
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
      } catch (error) {
        toast.error(error.data.message)
      }finally{
        setDisabled(false)
      }
      
    };
  

  return (
    <div className='bg-[#F3F3F3] h-screen flex items-center justify-center'>
        <div className=' basis-1/2 p-4 bg-white flex flex-col gap-6'>
      <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col gap-8 '>
        <div>
        <h1>Forgot Password</h1>
        <p className='text-[#676666]'>Enter your email to receive an OTP for password reset. (Check your spam folder if you don't receive a notification.)</p>
        </div>       

        <div className='relative'>
          <label htmlFor="email" className='absolute -top-3 left-4 bg-white'>Email</label>
          <input type="email"  id='email'  {...register('email',{
            required:"Please enter your email",
            pattern:{
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format"
            }
            })}/>
          {errors.email && <span className='text-red-500 absolute -bottom-5 left-0'>{errors.email.message}</span>}
        </div>

        <button disabled={isDisabled} type='submit' className='bg-[#212121] hover:bg-[#424242] active:bg-[#212121] text-white font-semibold duration-300 flex items-center justify-center gap-2 disabled:bg-gray-600'>Next {isDisabled && <div className='loader inline-block'></div>} </button>

        <p className='text-[#212121] text-center'><Link to={'/login'} className='underline font-semibold'>Back to login</Link></p>


      </form>


      </div>
      <Toaster position='top-right'/>
    </div>
  )
}

export default ForgotPassword