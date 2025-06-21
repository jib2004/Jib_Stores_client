import {useState} from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { Link,useNavigate } from 'react-router';
import { SignUpInfo } from '../../../types';
import { toast,Toaster } from 'sonner';
import { FaEyeSlash,FaEye} from "react-icons/fa";
import { useChangePasswordMutation } from '../../../api/users/auth';


const ChangePassword = () => {
    const navigate = useNavigate()
    const [changePassword] = useChangePasswordMutation()

    const [showPassword, setShowPassword] = useState(false);
    const [isDisabled, setDisabled] = useState(false);
    const email = localStorage.getItem("email")
   

    const { register, handleSubmit, formState: { errors } } = useForm<SignUpInfo>();
        const onSubmit: SubmitHandler<SignUpInfo> = async(data) =>{
          setDisabled(true) 
          try {
          const res = await changePassword({
             email,
            password: data.password,
          }).unwrap()
          toast(res?.message)
          localStorage.removeItem("email")
          setTimeout(() => {
            setDisabled(false)
          }, 4000);
          navigate('/login')
          } catch (error) {
            toast.error(error.message)
          }finally{
            setDisabled(false)
          }
          
        };


  return (
    <div className='bg-[#F3F3F3] h-screen flex flex-col items-center gap-10 justify-center'>
       <div className='w-[600px] p-4 bg-white flex flex-col gap-6'>
             <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col gap-8 '>
               <h1>Change Password</h1>
               <div className='relative'>
                 <label htmlFor="password" className='absolute -top-3 left-4 bg-white'>Password</label>
                 <input type={showPassword ? "text":"password"} className='!pr-8'  id='password' {...register("password",{
                   required:"Please enter your password",
                   minLength:{
                     value: 8,
                     message: "Password length cannot be less than 8",
                   },
                   // pattern:{
                   //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                   //   message: "Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.",
                   // }
                 })} />
                 <div className='absolute right-3 cursor-pointer -translate-y-[50%] top-[50%]' onClick={()=>setShowPassword(!showPassword)}>{showPassword ? <FaEye /> : <FaEyeSlash />}</div>
                 {errors.password && <span className='text-red-500 absolute -bottom-5 left-0'>{errors.password.message}</span>}
               </div>
               <button disabled={isDisabled} type='submit' className='bg-[#212121] hover:bg-[#424242] active:bg-[#212121] text-white font-semibold duration-300 flex items-center justify-center gap-2 disabled:bg-gray-600'>Change Password {isDisabled && <div className='loader inline-block'></div>} </button>
                </form>
             </div>

             <p className='text-[#212121] text-center'><Link to={'/login'} className='underline font-semibold'>Back to login</Link></p>
             <Toaster position='top-right'/>
    </div>
  )
}

export default ChangePassword