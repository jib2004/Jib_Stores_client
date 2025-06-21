import {useState} from 'react'
import banner from '../../../assets/img/a_banner_to_add_to_the_side.svg'
import { useForm, SubmitHandler } from "react-hook-form";
import { Link,useNavigate } from 'react-router';
import { FcGoogle } from "react-icons/fc";
import { SignUpInfo } from '../../../types';
import { FaEyeSlash,FaEye} from "react-icons/fa";
import { useSignUpMutation,useGoogleAuthMutation } from '../../../api/users/auth';
import { toast,Toaster } from 'sonner';
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { auth } from '../../../config/firebaseConfig';
import { useAppDispatch } from '../../../hooks/hooks';
import { getUserDetails } from '../../../api/userSlice/userSlice';


const SignUp = () => {
  const [signUp, { isLoading, isError, error }] = useSignUpMutation();
  const[googleSignUp] =useGoogleAuthMutation()
  const dispatch = useAppDispatch()

  
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
 


  const { register, handleSubmit, formState: { errors } } = useForm<SignUpInfo>();
  const onSubmit: SubmitHandler<SignUpInfo> = async(data) =>{
    if(isError){
      console.log(error);
    }
    try {
    const res = await signUp(data).unwrap()
    toast(res?.data.message)
    setDisabled(true)
    setTimeout(() => {
      setDisabled(false)
    }, 4000);
    navigate('/')
    dispatch(getUserDetails(res.data))
    } catch (error) {
      toast.error(error.data.message)
    }
    
  };


  const handleGoogle = async() =>{
    setDisabled(true)
    try {
      const provider = await new GoogleAuthProvider();
    const result = await  signInWithPopup(auth, provider);
    const res = await googleSignUp({
      name:result.user.displayName,
      email:result.user.email,
      profilePicture: result.user.photoURL
    }).unwrap()
    toast(res?.message)
    
  setTimeout(() => {
    setDisabled(false)
  }, 4000);
  
  navigate('/')
    } catch (error) {
       toast.error('Failed')
      setDisabled(false)
      console.log(error.data.message)
    }finally{
      setDisabled(false)
    }
    
  }

  return (
    <div className='bg-[#F3F3F3] h-screen flex items-center justify-center'>

    <div className='flex w-[1000px] h-[650px] border '>
      <figure className='basis-1/2 h-full'>
        <img src={banner} alt='Banner' className='h-full w-full '/>
        </figure>

        <div className=' basis-1/2 p-4 bg-white flex flex-col gap-6'>
      <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col gap-8 '>
        <h1>Create Account</h1>
        <div className='relative'>
          <label htmlFor="name" className='absolute -top-3 left-4 bg-white'>Name</label>
          <input type="text"  id='name' {...register("name",{
            required:"Your name is required",
            minLength:{value:3,
            message:"Name length cannot be less than 3"}
            })}/>
          {errors.name && <span className='text-red-500 absolute -bottom-5 left-0'>{errors.name.message}</span>}
        
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

        <button disabled={isDisabled} type='submit' className='bg-[#212121] hover:bg-[#424242] active:bg-[#212121] text-white font-semibold duration-300 flex items-center justify-center gap-2 disabled:bg-gray-600'>Create Account {isDisabled && <div className='loader inline-block'></div>} </button>

        <p className='text-[#212121]'>Already have an account? <Link to={'/login'} className=' underline'>Login</Link></p>

      </form>

      <div className='flex  items-center gap-3'> <div className='border h-[1px] basis-[50%]'></div> <span >or</span>  <div className='border h-[1px] basis-[50%]'></div></div>


      <div>
        <button onClick={handleGoogle} disabled={isDisabled} className='border border-black flex items-center justify-center gap-2 hover:bg-[#eaeaea] active:bg-transparent duration-300 disabled:bg-gray-600 text-[#676666] disabled:text-white' > <FcGoogle className='size-8'/> <span className=' text-[0.875rem]'>Sign up with Google</span> {isDisabled && <div className='loader inline-block'></div>} </button>
      </div>
      </div>

    </div>
          <Toaster position="top-right"/>
    </div>
  )
}

export default SignUp