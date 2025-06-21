import { appProps } from '../../../types'
import logo from '../../../assets/img/a_design_text_logo_for_jibstores_black-removebg-preview.png'
import { Link,useLocation} from 'react-router'
import { useAppSelector } from '../../../hooks/hooks'
import AccountMenu from '../../../components/Avatar'

const SellerMain = ({children}:appProps) => {
  const {pathname} = useLocation()
  const user = useAppSelector(state => state.user)


  
  
  return (
    <div className='flex h-screen bg-[#F7F7F7]'>
    <div className='border basis-[20%] bg-white flex flex-col justify-between py-2'>
        <figure className='flex justify-center'>
          <Link to='/dashboard'><img src={logo} alt="Jibs Store Logo" className=' size-[80px] object-cover ' /></Link> 
        </figure>

        <ul className='flex flex-col gap-1'>
          <li><Link className={` flex items-center pl-4 rounded-xl py-2 w-[85%]  mx-auto font-semibold text-[18px] ${pathname === '/dashboard' && 'bg-black text-white'}`} to={'/dashboard'} >Overview</Link> </li>
          <li><Link className={` flex items-center pl-4 rounded-xl py-2 w-[85%]  mx-auto font-semibold text-[18px] ${pathname.includes('/seller/product')  && 'bg-black text-white'}`} to={`/seller/product/${user._id}`} >Product</Link> </li>
          <li><Link className={` flex items-center pl-4 rounded-xl py-2 w-[85%]  mx-auto font-semibold text-[18px]`} to={'/'} >Customer</Link> </li>
          <li><Link className={` flex items-center pl-4 rounded-xl py-2 w-[85%]  mx-auto font-semibold text-[18px]`} to={'/'} >Shipment</Link> </li>
          <li><Link className={` flex items-center pl-4 rounded-xl py-2 w-[85%]  mx-auto font-semibold text-[18px]`} to={'/'} >Store Setting</Link> </li>
          <li><Link className={` flex items-center pl-4 rounded-xl py-2 w-[85%]  mx-auto font-semibold text-[18px]`} to={'/'} >Feedback</Link> </li>
          <li><Link className={` flex items-center pl-4 rounded-xl py-2 w-[85%]  mx-auto font-semibold text-[18px]`} to={'/'} >Help & Support</Link> </li>
          <li><Link className={` flex items-center pl-4 rounded-xl py-2 w-[85%]  mx-auto font-semibold text-[18px]`} to={'/'}>Switch to Buyer</Link> </li>
        </ul>

        <div className='h-[200px] border w-[85%]  mx-auto rounded-xl bg-black flex flex-col justify-between py-3 px-4'>
          <h1 className='text-[25px] text-white text-center'>Upgrade Your Plan</h1>
          <p className='text-white'>Discover new features to detailed report and analysis </p>
          <div className='w-full flex justify-center'>
          <Link to='/plans' className='bg-white w-[90%] mx-auto h-[40px] rounded-xl flex items-center justify-center font-medium active:bg-[#fff]  hover:bg-[#ece9e9] duration-150'>Upgrade Now</Link>
          </div>
        </div>
    </div>


    <div className=' basis-[80%]'>
      <nav className='border-b shadow flex justify-between items-center px-6 py-4'>
        <div>
          <input type="search" placeholder='Type here to search for products (eg Ball)' className=' rounded-2xl px-4 py-3 border-[2px] w-[400px] outline-none border-black'/>
        </div>

        <div className='flex items-center gap-3'>
          <div>
            <div>{user.email && <AccountMenu name={user.name}  src={user.profilePicture} isSeller={user.isSeller}/>} </div>
          </div>
          <div>
            <p className='text-[14px] font-semibold'>{user?.name}</p>
            <p className='text-[14px]'>{user?.email}</p>
          </div>
        </div>
      </nav>

      <section className='overflow-y-auto pt-4'>
      {children}
      </section>
      </div>


    </div>
  )
}

export default SellerMain