import {useState,useMemo} from 'react'
import App from '../../App'
import { useGetUserOrdersQuery } from '../../api/users/buyer'
import { useAppSelector,useAppDispatch } from '../../hooks/hooks'
import { useParams } from 'react-router'
import { productDetails } from '../../types'
import axios from 'axios'
import { useNavigate } from 'react-router'
import StatusTag from '../../components/OrderTag'


const OrderPage = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const {user} = useAppSelector(state =>state)
  const dispatch = useAppDispatch()
  const {data,error,status} = useGetUserOrdersQuery(id,{
    skip:!id
  })

  // console.log(data)
  

  // const orderProduct = data?.data?.map((item)=>{
  //   return item.productDetails.map((product)=>{
  //     return product.id
  //   })
  // })

  useMemo(()=>{ 
    // const getCart = async (productId) =>{
    //     for (const product of productId){
    //       for (const productid of product){
    //       try {
    //               const res = await axios.get(`http://localhost:5000/buyer/product/${productid}/${user._id}`);
    //               const newProduct = res.data.data;
    //               setProducts((prev) => {
    //               // Check if the product already exists in the array
    //               if (!prev.find((product) => product._id === newProduct._id)) {
    //                 return [...prev, newProduct]; // Add new product if it doesn't exist
    //               }
    //               return prev; // Return previous state if it exists
    //       })

    //               } catch (error) {
    //                 console.log(error);
    //               }
    //             }}
    //       } 

          if(data){
            // getCart(orderProduct)
            setProducts(data?.data)
          }
        //    setTimeout(()=>{
        //   setLoading(false) 
        // },import.meta.env.VITE_LOADING_TIMER )


      },[data])
      

  return (
    <App>
      <h1 className='p-4'>ORDERS</h1>
      <div className='flex flex-col gap-4 items-center p-4'>
        
          {products.length > 0 && products.map((item)=>(
            <div className='w-[80%] shadow-xl p-4 rounded-xl '>
              <div className='flex flex-col  gap-3'>
                <ul  className='flex justify-between'>
                  <li>Order Number: <span>{item.orderNumber}</span></li>

                  <li>Status: <span className=' capitalize'><StatusTag status={item.orderStatus} /></span></li>
                </ul>

                <div className='flex flex-col gap-4 '>
                  {item?.productDetails.length > 0  && item?.productDetails.map((p)=>(
                    <div className='flex gap-4 items-center rounded-lg shadow-md cursor-pointer p-3'>
                       <figure className='size-[150px]  '>
                    <img className='size-full object-contain rounded-xl' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_KEY}/image/upload/${p?.productImg}`} alt="" />
                  </figure>
                  <figcaption className='max-w-[700px]'>{p?.productName}</figcaption>
                    </div>
                  ))}
                 
                </div>
              </div>
            </div>
          ))}
      </div>
    </App>
  )
}

export default OrderPage
