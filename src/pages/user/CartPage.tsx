import {useState,useEffect } from 'react'
import { useParams,useNavigate } from 'react-router'
import { useGetCartByIdQuery } from '../../api/users/buyer'
import axios from 'axios'
import Loading from '../../components/Loading'
import App from '../../App'
import { toast,Toaster } from 'sonner'
import { useAppSelector,useAppDispatch } from '../../hooks/hooks'
import ListPrduct from '../../components/ListPrduct'
import { setProduct,resetQuantity } from '../../api/quatitySlice/quantitySlice'



const CartPage = () => {
  const {id} = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
     const [products, setProducts] = useState([]);
     const [loading, setLoading] = useState(true)
    const {data, isError,error} = useGetCartByIdQuery(id,{
      skip: !id,
      refetchOnReconnect: true,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    })
    const user = useAppSelector(state => state.user)
    const quantity =  useAppSelector(state => state.quantity)
    
    // if(isError){
    //      toast.error(error.data?.message || "An error occurred while fetching the cart data.");
      
     
    // }

    const navigateToCheckout  = () =>{
      if(products.length === 0){
        return toast.error('Please add to cart')
      }
      navigate(`/user/checkout/${user._id}`)
    }

    useEffect(()=>{
      const getCart = async (productId) =>{
        for (const id of productId){
    
          try {
                  const res = await axios.get(`http://localhost:5000/buyer/product/${id}/${user._id}`);
                  const newProduct = res.data.data;
                  setProducts((prev) => {
                  // Check if the product already exists in the array
                  if (!prev.find((product) => product._id === newProduct._id)) {
                    return [...prev, newProduct]; // Add new product if it doesn't exist
                  }
                  return prev; // Return previous state if it exists
          });

          const productPrice:number = newProduct.discountedPrice || newProduct.price
          // console.log(newProduct)
          // Dispatch the product to the Redux store
                    dispatch(setProduct({
                      id:newProduct._id,
                      productName:newProduct.title,
                      basePrice:productPrice ,
                      quantity:1,
                      sellerId:newProduct.sellerId,
                      email:newProduct.sellerName,
                      productImg:newProduct.image[0]
                    }));


                  } catch (error) {
                    console.log(error);
                  }
                }
          } 

          if(data){
            getCart(data?.data.cart);
          } 

          if( user.cart.length === 0){
            dispatch(resetQuantity())
          }
    
           setTimeout(()=>{
          setLoading(false) 
        },import.meta.env.VITE_LOADING_TIMER )
      },[data])
  return (
    <App>
      <Loading loading={loading}/>
      <div className='w-[90%] overflow-x-hidden mx-auto flex flex-col  md:flex-row md:justify-between  my-8 py-6'>
              <div className=' overflow-x-hidden  flex flex-col gap-3 py-4  flex-wrap'>
            {products && products.length > 0 && products.map((item)=>(
              <div className=''> 
              <ListPrduct
                id={item?._id} 
                name={item?.title} 
                img={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_KEY}/image/upload/${item?.image[0]}`} 
                price={item?.price} 
                rating={item?.rating} 
                isDiscounted={item?.isDisCount} 
                discountPrice={item?.discountedPrice} />
              </div>
            ))}
            </div>

            <div>
              <div className='w-[300px]  bg-white shadow-md rounded-md p-4'>
                <h3 className='text-xl font-semibold mb-4'>Cart Summary</h3>
                <p className='text-lg font-medium'>Total Items: {products.length}</p>
                <p className='text-lg font-medium mt-2'>Total Price: &#8358;{quantity.reduce((acc, item) => acc + (item.price ? item.price : item.basePrice), 0).toLocaleString()}</p>
                <button onClick={navigateToCheckout} className='mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-[#2d2d2d] transition duration-200'>Checkout</button>
              </div>
            </div>

            

          </div>

<div>
              {products.length === 0 && 
              <div className='  flex justify-center items-center'>
                <h3 className='text-2xl font-semibold'>Your Cart is Empty</h3>
              </div>}
            </div>
        <Toaster position='top-right'/>
    </App>
  )
}

export default CartPage