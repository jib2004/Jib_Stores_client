import {useEffect} from 'react'
import App from '../../../App'
import pendingImg from '../../../assets/img/wall-clock.png'
import successImg from '../../../assets/img/check (1).png'
import failedImg from '../../../assets/img/remove.png'
import { useAppSelector,useAppDispatch } from '../../../hooks/hooks'
import { useUserVerificationPaymentMutation } from '../../../api/users/auth'
import { Toaster,toast } from 'sonner'
import { useNavigate } from 'react-router'
import { getUserDetails } from '../../../api/userSlice/userSlice'

const ConfirmSubscription = () => {
    let subscriptionStatus:'pending' | 'successful' | 'failed' = 'pending'
    const date =  new Date()
    const user =  useAppSelector(state => state.user)
    const navigate  = useNavigate()
    const [verifyPaymnent] = useUserVerificationPaymentMutation()
    const dispatch = useAppDispatch()

    const verifyUserPayment = async () =>{
        try {
            const response = await verifyPaymnent({
                reference:user.subscription.reference,
                email:user.email
            }).unwrap()
            if(response.data.subscription.status === 'success'){
                navigate('/dashboard')
                toast.success('Subscription successful')
                subscriptionStatus = 'successful'
                dispatch(getUserDetails(response.data))
            }
        } catch (error) {
            toast.error(error.data.data.gateway_response)
            subscriptionStatus = 'failed'
        }
    }

  return (
    <App >
        <div className='border h-[648px] flex justify-center items-center'>
        <div className='bg-white shadow-lg rounded-xl  border w-[500px] h-[500px] px-4 py-2 flex flex-col gap-3'>
            <h1 className='text-2xl text-center'>Confirm Subscription</h1>
            <p className='text-center'>Confirm your subscription to proceed.</p>

            <div className=' flex flex-col items-center gap-3'>
                <figure className='flex flex-col items-center'> 
                <img className='size-[64px] object-contain' 
                    src={subscriptionStatus === 'pending' ? `${pendingImg}` : 
                    subscriptionStatus === 'successful' ? `${successImg}` : 
                    `${failedImg}`} 
                    alt={subscriptionStatus} />
                <figcaption  className=' capitalize text-xl font-semibold'>{subscriptionStatus}</figcaption>
                </figure>

                 <div class="loading"></div> 

                <ul className='flex flex-col items-center w-[80%] gap-4 mx-auto'>
                    <li>Date: <span className=' font-semibold'>{date.toDateString()}</span> </li>
                    <li>Reference Number: <span className=' font-semibold'>{user.subscription.reference}</span></li>
                    <li>Make Payment: <a href={user.subscription.authorization_url} target='_blank' className=' font-semibold'>Click incase you are not automatically redirected to the payment screen </a></li>
                    <li>Amount: <span className=' font-semibold'>{user.subscription.amount}</span></li>
                </ul>

                <div>
                    <button onClick={verifyUserPayment} className='bg-black hover:bg-[#2d2d2d] active:bg-black  text-white font-bold py-2 px-4 rounded-xl'>Confirm Payment</button>
                </div>
            </div>


        </div>
        </div>
        <Toaster />
    </App>
  )
}

export default ConfirmSubscription