import Navbar from "./components/Navbar"
import Topbanner from "./components/Topbanner"
import { appProps } from "./types"
import { useAppSelector } from './hooks/hooks'

function App({children}:appProps) {
  const  user  = useAppSelector((state) => state.user)
  // console.log(user)
  return (
    <>
    {!user.name && <Topbanner/>}

    <Navbar />
      {children}
    </>
  )
}

export default App
