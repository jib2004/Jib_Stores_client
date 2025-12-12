import Navbar from "./components/Navbar"
import Topbanner from "./components/Topbanner"
import { appProps } from "./types"
import { useAppSelector,useAppDispatch } from './hooks/hooks'
import { useCookieCheckMutation, useLogoutMutation } from "./api/users/auth"
import { logout } from "./api/userSlice/userSlice"
import { persistor } from "./store"
import { resetQuantity } from "./api/quatitySlice/quantitySlice"
import { useEffect } from "react"


function App({children}:appProps) {
  const  user  = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const [cookieVerify] = useCookieCheckMutation()
  const [logoutMutation] = useLogoutMutation()
  
  useEffect(()=>{
    
  const cookieChecker = async() =>{
    try{
      const response = await cookieVerify('').unwrap()
      // console.log(response)
     if(response.status === true){
        console.log("User is authenticated")
     }else{
        console.log("User is not authenticated")
     }
    
    }catch(e){
      console.log(e)
      await logoutMutation('').unwrap()
      dispatch(logout())
      dispatch(resetQuantity())
      await persistor.purge()
    
    }
  }
    cookieChecker()
  },[])

  return (
    <>
    {!user.name && <Topbanner/>}

    <Navbar />
      {children}
    </>
  )
}

export default App
