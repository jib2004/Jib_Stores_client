import { maskEmail } from '../../../lib/maskEmail'
import OTPInput from '../../../components/Otp'
import { Link } from 'react-router'
import { useSendOTPMutation } from '../../../api/users/auth'
import { toast, Toaster } from 'sonner'


const VerifyPasswordOtp = () => {
    const email = localStorage.getItem("email")
    const maskedEmail = maskEmail(email)
    const [sendOtp ] = useSendOTPMutation()

    console.log(email)
    const resendOtp =async()=>{
        try{
            const response = await sendOtp({email}).unwrap()
            toast.success(response.message)
        }catch(e){
            // toast.error(e.message)
            console.log(e.message)
        }
    }
   
  return (
    <div className='bg-[#F3F3F3] h-screen flex flex-col items-center gap-10 justify-center'>
        <div className='w-[600px] p-4 bg-white flex flex-col gap-1 text-center'>
        <h1>Enter your code</h1>
        <p className='font-semibold'>We sent a security code to </p>
        <p className='font-semibold text-[#676666]' onClick={resendOtp} role='button'>Send New Code {maskedEmail}</p>
        <OTPInput />

        </div>
        <p className='text-[#212121] text-center'><Link to={'/login'} className='underline font-semibold'>Back to login</Link></p>
        <Toaster position='top-right'/>
    </div>
  )
}

export default VerifyPasswordOtp