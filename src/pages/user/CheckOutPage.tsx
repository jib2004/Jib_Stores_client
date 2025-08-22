import {  useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import App from '../../App'
import { useAppSelector,useAppDispatch } from '../../hooks/hooks'
import { useUserDetailsUpdateMutation } from '../../api/users/auth'
import { setUserAddress } from '../../api/userSlice/userSlice'
import { useParams } from 'react-router'
import PaystackButton from '../../components/PaystackButton'
import { Toaster, toast } from 'sonner'

const CheckOutPage = () => {
  const [address,setAddress] = useState<string | undefined>('')
  const quantity = useAppSelector(state=> state.quantity)
  const user = useAppSelector(state => state?.user)
  const [loading,setLoading]  = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const [updateuserAddress] = useUserDetailsUpdateMutation()
  const {id} = useParams()


  useMemo(()=>{
    setAddress(user.address)
  },[user.address])
  

  const totalPrice:number = quantity.reduce((acc, item) => acc + (item.price ? item.price : item.basePrice), 0)

  const handleAdressUpdate = async() =>{
    setLoading(true)
    try {
      await updateuserAddress({id,body:{address}}).unwrap()
      dispatch(setUserAddress({address}))
      toast.success('Address updated successfully')
      setTimeout(()=>{
        setLoading(false)
      },5000)
      
    } catch (error) {
      toast.error('Failed to update address')
      console.log(error)
      setTimeout(()=>{
        setLoading(false)
      },5000)
    }
  }

  
  return (
    <App>
      <motion.div 
      className=' my-4 flex justify-center '
      initial={{
        opacity:0,
        x:500
      }}
      animate={{
        opacity:1,
        x:0,
      
        transition:{
          duration:0.5,
          ease:"easeInOut"
        }
            }}
      >
        <div className='w-[60%] p-4 border '>
        <div className='w-[400px] p-4 flex flex-col gap-3'>
          <h1 className='text-[24px] leading-6'>Address</h1>
          <input onChange={(e)=> setAddress(e.target.value)} value={address} type="text" placeholder='123,Mario Av Road' />
          <motion.button 
          disabled={loading}
          whileHover={{
                backgroundColor:'#343434',
                transition:{
                  ease:'easeIn',
                  duration:0.5
                }
              
              }} 
              whileTap={{
                backgroundColor:'#000'
              }}
              onClick={handleAdressUpdate}
              className='bg-[#000] text-white w-[150px] disabled:bg-[#343434]'>{loading? 'Loadding...': "Add address"}</motion.button>
        </div>
        
        <ul className='w-[400px] p-4 flex flex-col gap-3'>
          <h1 className='text-[24px] leading-6'>PRODUCT SUMMERY</h1>
          {quantity && quantity.length > 0 && quantity.map((item)=>(
            <li className=''>
                <h4><span className='font-medium'>Name:</span> <span className=' font-semibold'>{item.productName}</span></h4>
                <p> <span className='font-medium'>Price:</span> <span className=' font-semibold'>&#8358;{item.basePrice.toLocaleString()}</span></p>
                <p><span className='font-medium'>Quantity:</span> <span className=' font-semibold'>X{item.quantity}</span></p>
                <p><span className='font-medium'>Total Price:</span> <span className=' font-semibold'>&#8358;{item.price ? item.price.toLocaleString() : item.basePrice.toLocaleString()}</span></p>
            </li>
          ))}
        </ul>

        <PaystackButton 
        id={id as string} 
        email={user.email as string} 
        amount={totalPrice} 
        address={address.trim()}
        />

          </div>

          
      </motion.div>
      <Toaster 
      position='top-right' 
      richColors 
      // closeButton// was commented out beause it was causing an error showing the close button and the error toast
      // toastOptions={{
      //             className: 'bg-[#000] text-white',
      //             style: {
      //               fontSize: '16px',
      //               color: '#fff',
      //             },
      //           }}
      />
    </App>
  )
}

export default CheckOutPage