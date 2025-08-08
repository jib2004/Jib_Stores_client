import  {useState,useEffect} from 'react'
import { useGetUserWislistQuery } from '../../api/users/buyer'
import { useParams,Link } from 'react-router'
import App from '../../App'
import ProductCard from '../../components/ProductCard'
import axios from 'axios'
import Loading from '../../components/Loading'
import { useAppSelector } from '../../hooks/hooks'

const Wishlist = () => {
  const {id} = useParams()
  
   const [products, setProducts] = useState([]);
   const user = useAppSelector(state => state.user)
   const [loading, setLoading] = useState(true)
  const {data, isError,error} = useGetUserWislistQuery(id,{
    skip: !id,
    refetchOnReconnect: true,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    // pollingInterval: 1000
  })
  
  if(isError){
    console.log(error)
  }
  useEffect(()=>{
      const getWishlist = async (productId) =>{
            for (const id of productId){

              try {
                const res = await axios.get(`https://jib-stores-backend.vercel.app/buyer/product/${id}/${user._id}`);
                   const newProduct = res.data.data;
                 setProducts((prev) => {
        // Check if the product already exists in the array
        if (!prev.find((product) => product._id === newProduct._id)) {
          return [...prev, newProduct]; // Add new product if it doesn't exist
        }
        return prev; // Return previous state if it exists
      });
              } catch (error) {
                console.log(error);
              }
            }
      } 


      if(data){
        getWishlist(data?.data.wishlist);
      } 

       setTimeout(()=>{
      setLoading(false) 
    },import.meta.env.VITE_LOADING_TIMER )
  },[data])

  
  return (
    <App>
      <Loading loading={loading}/>
      <div className='w-[90%] overflow-x-hidden mx-auto flex flex-col gap-9 my-8 py-6'>
              <div className=' overflow-x-hidden  flex gap-3 py-4  flex-wrap'>
            {products && products.length > 0 && products.map((item)=>(
              <Link to={`/user/product/${item?._id}`} className=''> <ProductCard name={item?.title} img={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_KEY}/image/upload/${item?.image[0]}`} price={item?.price} rating={item?.rating} isDiscounted={item?.isDisCount} discountPrice={item?.discountedPrice} /></Link>
            ))}
            </div>
          </div>
    </App>
  )
}

export default Wishlist