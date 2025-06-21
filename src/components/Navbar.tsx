import logo from '../assets/img/a_design_text_logo_for_jibstores_black-removebg-preview.png' 
import { Link,useLocation } from 'react-router'
import Cart from '../components/Cart'
import AccountMenu from './Avatar'
import NotSignedIn from './NotSignedIn'
import { useAppSelector } from '../hooks/hooks'

const Navbar = () => {
  const user  = useAppSelector(state => state.user)
  const {pathname} = useLocation()
  
  return (
    <nav className='  border  flex items-center justify-between w-screen px-4'>
        <figure className=''>
           <Link to={pathname.includes("/seller")|| pathname.includes("/dashboard") ? '/dashboard' : "/"}><img src={logo} alt="The loge of jibsstores" className='size-[80px] ' /></Link>  
        </figure>

        <div></div>

        <div className='flex items-center gap-3 pr-6'>
          { user.name && <p>Hi {user.name}</p>}
          <div>{user.email ? <AccountMenu name={user.name}  src={user.profilePicture} isSeller={user.isSeller}/> : <NotSignedIn/>}</div>
          <div><Cart id={user._id} cart={user.cart?.length}/></div>
        </div>

    </nav>
  )
}

export default Navbar