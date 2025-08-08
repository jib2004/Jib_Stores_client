import {useState} from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { Link,useNavigate } from 'react-router';
import { FcGoogle } from "react-icons/fc";
import { SignUpInfo } from '../../../types';
import { FaEyeSlash,FaEye} from "react-icons/fa";
import { toast,Toaster } from 'sonner';
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { auth } from '../../../config/firebaseConfig';
import { useLoginMutation,useGoogleAuthMutation } from '../../../api/users/auth';
import { useAppDispatch } from '../../../hooks/hooks';
import { getUserDetails } from '../../../api/userSlice/userSlice';

const Login = () => {
  const [login] = useLoginMutation() 
  const [googleAuth] = useGoogleAuthMutation()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const dispatch = useAppDispatch()
 


  const { register, handleSubmit, formState: { errors } } = useForm<SignUpInfo>();
  const onSubmit: SubmitHandler<SignUpInfo> = async(data) =>{
    setDisabled(true)
    try {
    const res = await login(data).unwrap()
    //  toast(res?.message)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          l.message)
    
      dispatch(getUserDetails(res.data))
    setTimeout(() => {
      setDisabled(false)
    }, 4000);
    navigate('/')
    } catch (error) {
      toast.error(error.data.message)
      // console.log(error)
    }finally{
      setDisabled(false)
    }
    
  };


  const handleGoogle = async() =>{
    setDisabled(true)
    try {
      const provider = await new GoogleAuthProvider();
    const result = await  signInWithPopup(auth, provider);
    const res = await googleAuth({
      name:result.user.displayName,
      email:result.user.email,
      // profilePicture: result.user.photoURL
    }).unwrap()
    toast(res?.data.message)
    dispatch(getUserDetails(res.data))
  
  setTimeout(() => {
    setDisabled(false)
  }, 4000);
  navigate('/')
    } catch (error) {
      toast.error(error)
      console.log(error.data.message)
      
    setDisabled(false)
    }finally{
      setDisabled(false)
    }
    
  }
  return (
    <div className='bg-[#F3F3F3] h-screen flex items-center justify-center'>
       <div className=' basis-1/2 p-4 bg-white flex flex-col gap-6'>
      <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col gap-8 '>
        <h1>Sign In</h1>       

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

        <div className='relative'>
          <label htmlFor="password" className='absolute -top-3 left-4 bg-white'>Password</label>
          <input type={showPassword ? "text":"password"} className='!pr-8'  id='password' {...register("password",{
            required:"Please enter your password",
          })} />
          <div className='absolute right-3 cursor-pointer -translate-y-[50%] top-[50%]' onClick={()=>setShowPassword(!showPassword)}>{showPassword ? <FaEye /> : <FaEyeSlash />}</div>
          {errors.password && <span className='text-red-500 absolute -bottom-5 left-0'>{errors.password.message}</span>}
        </div>

        <button disabled={isDisabled} type='submit' className='bg-[#212121] hover:bg-[#424242] active:bg-[#212121] text-white font-semibold duration-300 flex items-center justify-center gap-2 disabled:bg-gray-600'>Sign In {isDisabled && <div className='loader inline-block'></div>} </button>

          <div><Link to="/forgotten-password" className='font-semibold'>Forgot Password?</Link></div>
        <p className='text-[#212121]'>Don't have an account? <Link to={'/register'} className=' underline'>Sign Up</Link></p>


      </form>



      <div className='flex  items-center gap-3'> <div className='border h-[1px] basis-[50%]'></div> <span >or</span>  <div className='border h-[1px] basis-[50%]'></div></div>


      <div>
        <button onClick={handleGoogle} disabled={isDisabled} className='border border-black flex items-center justify-center gap-2 hover:bg-[#eaeaea] active:bg-transparent duration-300 disabled:bg-gray-600 text-[#676666] disabled:text-white' > <FcGoogle className='size-8'/> <span className=' text-[0.875rem]'>Sign in with Google</span> {isDisabled && <div className='loader inline-block'></div>} </button>
      </div>
      </div>

          <Toaster position="top-right"/>
    </div>
  )
}

export default Login