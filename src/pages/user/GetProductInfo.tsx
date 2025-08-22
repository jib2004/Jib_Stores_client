import { useEffect, useState} from 'react'
import {  useGetProductByIdQuery,useAddToWishListMutation,useUseAddToCartMutationMutation } from '../../api/users/buyer'
import { useParams,useNavigate } from 'react-router'
import App from '../../App';
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { toast,Toaster } from 'sonner';
import { useAppSelector,useAppDispatch } from '../../hooks/hooks';
import { addToWishlist,removeFromWishlist,addedProductToCart,removeFromCart } from '../../api/userSlice/userSlice';
import { resetQuantity } from '../../api/quatitySlice/quantitySlice';

const GetProductInfo = () => {
    const [image,setImage] = useState(0)
    const user = useAppSelector(state => state.user)
    const {id} = useParams()
    const {data,status,error} = useGetProductByIdQuery({id,userId:user._id},{
        skip:!id,
        refetchOnReconnect: true,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    })
    const [wishList] = useAddToWishListMutation()
    const dispatch = useAppDispatch()
    const [isWishList, setIsWishList] = useState(false);
    const [addToCart] = useUseAddToCartMutationMutation()
    const navigate = useNavigate()

    if(!user._id ){
        navigate('/login') 
    }


    
    if(error){
        console.log(error)
    
    }

    const handleWisList = async() =>{
        try {
            setIsWishList(prev => !prev);
            const res = await wishList({id:user._id,body:{addWishlist:data.data?._id}}).unwrap()
            const findWishlist = user.wishlist.find((item) => item === data.data?._id);
            if (findWishlist) {
                dispatch(removeFromWishlist(data.data?._id));
                
            } else {
                dispatch(addToWishlist(data.data?._id));
            }
            if(res.data.message){
                toast.success(res.data.message)
            }else{
                toast.success('Added to wishlist')
            }
            
        } catch (error) {
            toast.error(error.data.message)
            
        }
        
    }

    const handleCart = async() =>{
        try {
            // setAddedToCart(prev => !prev);
            await addToCart({id:user._id, body:{addCart:data.data?._id}}).unwrap()
            const findCart = user.cart.find((item) => item === data.data?._id);
            if (findCart) {
                toast.success('Removed from cart')
                dispatch(removeFromCart(data.data?._id));
                dispatch(resetQuantity())
                
            }
            else {
                toast.success('Added to Cart')
                dispatch(addedProductToCart(data.data?._id));
                dispatch(resetQuantity())
            }
        } catch (error) {
            toast.error(error.data.message)
        }
    }

    

    useEffect(()=>{
         const findWish = user.wishlist.find((item) => item === data?.data?._id);
         if ( findWish) {
      setIsWishList(!isWishList);
    }
    },[data])
    
    
  return (
    <App>
         <div className="overflow-y-scroll md:h-[600px] ">
                {status === 'pending' && <div>Loading...</div>}
                {status === 'fulfilled' && (
                    <div className="px-4 flex flex-col md:flex-row py-2 gap-3">
                        <div className="flex flex-col gap-3 md:w-[400px]">
                        <div className="w-[400px] h-[300px] ">
                            <figure className="w-full h-full" >
                                <img className="w-full h-full object-cover rounded-lg" src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_KEY}/image/upload/${data.data?.image[image]}`} alt="" />
                            </figure>
                            
                        </div>
                        <ul className="w-full flex  flex-wrap gap-2">
                                {
                                    data.data?.image && data.data?.image.length > 0 && data.data?.image.map((item:string,index:number) =>(
                                        <li className="size-[50px] rounded-lg   ">
                                            <img  onClick={()=>setImage(index)} className={`size-full cursor-pointer border rounded-lg mx-auto object-contain ${index === image && 'border-black border-[3px]'}`} src={`https://res.cloudinary.com/dqvjddmln/image/upload/${item}`} alt={`${item}`} />
                                        </li>
                                    ))
                                }
        
                            </ul>

                            <div className='flex items-center gap-3'>
                                <button onClick={handleCart} className='border flex items-center justify-center gap-3 text-white bg-black font-semibold'><FaCartShopping/> Add to Cart </button>
                                <button onClick={handleWisList} className={`border flex items-center justify-center gap-3 text-white bg-black font-semibold `}><FaHeart className={`${isWishList && ' text-red-600'}`}/> Wishlist</button>
                            </div>

                        </div>
                        <div className="flex flex-col gap-4">
                        <h1 className="text-4xl"> {data.data?.title}</h1>
                        <div className="flex gap-2 my-2"><span className="text-2xl font-semibold">Price :</span> <span className={data.data?.isDisCount ?'block text-2xl font-semibold' : 'hidden'}>	&#8358;{data.data?.discountedPrice?.toLocaleString()}</span> <span className={`${data.data?.isDisCount ? 'text-gray-500 line-through text-2xl font-semibold' : 'black font-semibold text-2xl'}`}>	&#8358;{data.data?.price.toLocaleString()}</span> {data.data?.isDisCount && <p className=" w-[40px] font-semibold rounded-lg text-white bg-red-500 text-xs grid place-content-center ">{Math.floor((data.data?.price - data.data?.discountedPrice ) / data.data?.price * 100 )}%</p>}</div>
                        
                        <div className='flex gap-1'>
                            {/* <HalfRating rating={rate}/> */}
                            <p className='text-[#666666]'>{data.data?.rating?.count} reviews</p>
                            <p><span>Total Reviews:</span> {data.data?.rating?.rate.length}</p>
                        </div>
                        
        
                        <div className='text-justify '>  
                            <h2 className="font-semibold text-xl">Description:</h2>
                            <article>{data.data?.description}</article>
                        </div>
                        
                        </div>
                    
                    </div>
                )}
        
                </div>
                <Toaster position='top-right' />
    </App>
  )
}

export default GetProductInfo