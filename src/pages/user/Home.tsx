import { useEffect, useState } from 'react'
import App from '../../App'

// import axios from 'axios'
import AdandCategories from '../../components/AdandCategories'
import CategoriesCarosel from '../../components/CategoriesCarosel'
// import BestSelling from '../../components/BestSelling'
import GetAllProducts from '../../components/GetAllProducts'
import Loading from '../../components/Loading'

export const Home = () => {
 
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },import.meta.env.VITE_LOADING_TIMER )
  },[])


  return (
    <div className={` overflow-x-hidden  ${loading && 'overflow-hidden'}`}>
       <Loading loading={loading}/>
    <App>
     
      <AdandCategories/>
      <CategoriesCarosel/>
      {/* <BestSelling/> */}
      <GetAllProducts/>
      </App>
      </div>
    
  )
}
