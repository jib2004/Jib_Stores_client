import { useEffect, useState } from 'react'
import App from '../../App'
import { useAppSelector } from '../../hooks/hooks'
// import axios from 'axios'
import AdandCategories from '../../components/AdandCategories'
import CategoriesCarosel from '../../components/CategoriesCarosel'
// import BestSelling from '../../components/BestSelling'
import GetAllProducts from '../../components/GetAllProducts'
import Loading from '../../components/Loading'

export const Home = () => {
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    // const getAllProducts = async() =>{
    //   setLoading(true)
    //     try {
    //       const res = await axios.get('https://fakestoreapi.com/products')
          
    //       setLoading(false)
    //       return setProduct(res.data)
    //     } catch (error) {
    //       console.log(error)
    //     }
    // }

    // getAllProducts()

    setTimeout(()=>{
      setLoading(false)
    },import.meta.env.VITE_LOADING_TIMER )
  },[])


  const user  = useAppSelector((state) => state.user)
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
