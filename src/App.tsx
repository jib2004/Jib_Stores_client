import Navbar from "./components/Navbar"
import Topbanner from "./components/Topbanner"
import { appProps } from "./types"
import { useAppSelector,useAppDispatch } from './hooks/hooks'
import { useCookieCheckQuery, useLogoutMutation } from "./api/users/auth"
import { logout } from "./api/userSlice/userSlice"
import { persistor } from "./store"
import { resetQuantity } from "./api/quatitySlice/quantitySlice"
import { useEffect } from "react"


function App({children}:appProps) {
  const  user  = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const {data} = useCookieCheckQuery(undefined)
  const [logoutMutation] = useLogoutMutation()

  // console.log(data)
  // console.log(error)



  
  useEffect(()=>{
    
  const cookieChecker = async() =>{
    try{
      if(!data ){
        await logoutMutation('').unwrap()
        dispatch(logout())
        persistor.purge()
        dispatch(resetQuantity())
      }
    }catch(e){
      console.log(e)
      dispatch(logout())
      persistor.purge()
      dispatch(resetQuantity())
    }
  }
    cookieChecker()
  },[data])

  return (
    <>
    {!user.name && <Topbanner/>}

    <Navbar />
      {children}
    </>
  )
}

export default App
