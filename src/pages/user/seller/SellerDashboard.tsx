import SellerMain from './SellerMain'
// import { useGetProductsQuery } from '../../../api/users/seller'
import { useAppSelector } from '../../../hooks/hooks'
import { useNavigate } from 'react-router'
import { useEffect,useState } from 'react'
import Loading from '../../../components/Loading'



const SellerDashboard = () => {
  const user = useAppSelector(state => state.user)
  const navigate = useNavigate()
   const [loading, setLoading] = useState(true)

  useEffect(()=>{
    if (user.plan === ""){
      navigate("/plans")
    }

    setTimeout(()=>{
      setLoading(false)
    },import.meta.env.VITE_LOADING_TIMER )
  },[])

 
  return (
    <div>
      <Loading loading={loading}/>
      <SellerMain>
      SellerDashboard
      </SellerMain>
      </div>
  )
}

export default SellerDashboard