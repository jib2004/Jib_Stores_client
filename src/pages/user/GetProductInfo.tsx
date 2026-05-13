import { useEffect, useState,useRef} from 'react'
import {  useGetProductByIdQuery,useAddToWishListMutation,useUseAddToCartMutationMutation, useGetReviewsQuery, useCreateReviewMutation } from '../../api/users/buyer'
import { useParams,useNavigate } from 'react-router'
import App from '../../App';
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { toast,Toaster } from 'sonner';
import { useAppSelector,useAppDispatch } from '../../hooks/hooks';
import { addToWishlist,removeFromWishlist,addedProductToCart,removeFromCart } from '../../api/userSlice/userSlice';
import { resetQuantity } from '../../api/quatitySlice/quantitySlice';
import { Review } from '../../types';

const GetProductInfo = () => {
    const [image,setImage] = useState(0)
    const rev = useRef<HTMLTextAreaElement>(null)
    const user = useAppSelector(state => state.user)
    const [reviews,setReviews] = useState<Review[]>([])
    const [loadinReivewPost,setLoadinReivewPost] = useState<boolean>(false)
    const {id} = useParams()
    const {data,status,error} = useGetProductByIdQuery({id,userId:user._id},{
        skip:!id,
        refetchOnReconnect: true,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    })

    const { data:userReviews,refetch} = useGetReviewsQuery(id,{ //refetch -> this is a method used to fetch for the data once an event has been triggered
        skip:!id,
        refetchOnReconnect: true,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    })

    const [createReview] = useCreateReviewMutation()


    const [wishList] = useAddToWishListMutation()
    const dispatch = useAppDispatch()
    const [isWishList, setIsWishList] = useState(false);
    const [addToCart] = useUseAddToCartMutationMutation()
    const navigate = useNavigate()
    // const [sizes,setSizes] = useState<string>('')

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
            console.log(error)
            if(error.status === 403){
                navigate('/login')
            }
            
        }
        
    }

    const handleReviews = async () =>{
        if(!rev.current.value){
         toast.warning('This Field cannot be empty')
         return
        }
        setLoadinReivewPost(true)
        try {
            await createReview({
                productId:id,
                userId:user._id,
                body:{
                    review:rev.current.value
                }
            }).unwrap()
            refetch()
            
            toast.success("Review Posted!")
        } catch (error) {
            toast.error(error?.data.message)
        }finally{
            setLoadinReivewPost(false)
            rev.current.value = ""
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
            console.log(error)
            if(error.status === 403){
                navigate('/login')
            }
        }
    }


    useEffect(()=>{
         const findWish = user.wishlist.find((item) => item === data?.data?._id);
         if ( findWish) {
      setIsWishList(!isWishList);
      
    }

    if(userReviews?.status){
        setReviews(userReviews.data.reviews)
    }
    },[data,userReviews])
    
    
  return (
    <App>
         <div className="bg-[#EAEDED] py-6 md:py-8 ">
                {status === 'pending' && <div className='h-screen w-screen flex items-center justify-center text-4xl font-semibold'>Loading...</div>}
                {status === 'fulfilled' && (
                    <div className="px-4 lg:px-8 flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
                        <div className="flex flex-col gap-4 lg:w-[40%] xl:w-[35%] lg:sticky lg:top-24 self-start">
                        <div className="w-full h-[460px] bg-white rounded-lg shadow-sm p-4">
                            <figure className="w-full h-full grid place-items-center">
                                <img className="w-full h-full object-contain" src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_KEY}/image/upload/${data.data?.image[image]}`} alt="" />
                            </figure>
                            
                        </div>
                        <ul className="w-full flex flex-wrap gap-2">
                                {
                                    data.data?.image && data.data?.image.length > 0 && data.data?.image.map((item:string,index:number) =>(
                                        <li className="size-[56px] rounded-lg bg-white shadow-sm">
                                            <img  onClick={()=>setImage(index)} className={`size-full cursor-pointer border rounded-lg mx-auto object-contain hover:ring-2 hover:ring-amber-400 ${index === image && 'border-black border-[3px]'}`} src={`https://res.cloudinary.com/dqvjddmln/image/upload/${item}`} alt={`${item}`} />
                                        </li>
                                    ))
                                }
        
                            </ul>

                            <div className='flex items-center gap-3'>
                                <button onClick={handleCart} className='flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-500 text-black font-semibold shadow-sm transition-colors'><FaCartShopping/> Add to Cart </button>
                                <button onClick={handleWisList} className={`flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-white text-gray-900 border border-gray-300 hover:border-gray-400 shadow-sm transition-colors font-semibold`}><FaHeart className={`${isWishList && ' text-red-600'}`}/> Wishlist</button>
                            </div>

                        </div>
                        <div className="flex flex-col gap-4 lg:w-[60%] xl:w-[65%] bg-white rounded-lg shadow-sm p-6">
                        <h1 className="text-2xl md:text-3xl font-semibold"> {data.data?.title}</h1>
                        <div className="flex items-center flex-wrap gap-2 my-2"><span className="text-xl font-semibold">Price :</span> <span className={data.data?.isDisCount ?'block text-2xl font-bold text-green-700' : 'hidden'}>	&#8358;{data.data?.discountedPrice?.toLocaleString()}</span> <span className={`${data.data?.isDisCount ? 'text-gray-500 line-through text-2xl font-semibold' : 'text-neutral-900 font-bold text-2xl'}`}>	&#8358;{data.data?.price.toLocaleString()}</span> {data.data?.isDisCount && <p className=" w-[48px] font-semibold rounded-md text-white bg-red-500 text-xs grid place-content-center ">{Math.floor((data.data?.price - data.data?.discountedPrice ) / data.data?.price * 100 )}%</p>}</div>
                        
                        <div className='flex gap-2 items-center text-sm'>
                            {/* <HalfRating rating={rate}/> */}
                            <p className='text-neutral-600'>{data.data?.rating?.count} reviews</p>
                            <p className='text-neutral-600'><span className='text-neutral-700'>Total Reviews:</span> {reviews?.length}</p>
                        </div>

                        <div>
                            <h2 className="font-semibold text-xl mb-1">Available Sizes:</h2>
                            <div className='flex gap-3'>
                                {
                                    data.data?.sizes && data.data?.sizes.length > 0 && data.data?.sizes.map((size:string,index:number) =>(
                                        <span key={index} className='px-3 py-1 cursor-pointer font-semibold border border-gray-300 rounded-md text-neutral-800'>{size}</span>
                                    ))
                                }
                            </div>
                        </div>
                        
        
                        <div className='text-justify border-t pt-4'>  
                            <h2 className="font-semibold text-xl mb-1">Description:</h2>
                            <article className='text-neutral-800'>{data.data?.description}</article>
                        </div>

                        <div className='flex flex-col gap-4'>
                        <h2 className='font-bold text-2xl'>Reviews</h2>
                        <div>
                        <textarea 
                        ref={rev}
                        className='border w-full px-4 py-2 rounded-md '
                        name="review" 
                        id="review"
                        placeholder='Write a review'
                        ></textarea>
                        <button
                        onClick={handleReviews} 
                        disabled={loadinReivewPost}
                        className='border text-[14px] p-4 w-fit bg-purple-500 text-white font-medium disabled:bg-purple-800 '>Submit Review</button>
                        </div>
                        <ul className='flex flex-col gap-4'>
                        {reviews && reviews?.length > 0 ? reviews?.map(review=>(
                            <li>
                                <figure className="flex items-center gap-3">
                                    <div className='h-[60px] '>
                                    <img 
                                    className='w-[60px] aspect-square rounded-full border-2'
                                    src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_KEY}/image/upload/${review?.userId?.profilePicture[0]}`} 
                                    alt={`profile_pic`} />
                                    </div>
                                    <figcaption>
                                        <div className='text-[14px] font-medium text-gray-500'>
                                            {review.userId.name}
                                        </div>

                                        <div className='text-[18px] font-medium'>
                                            {review.review}
                                        </div>
                                    </figcaption>
                                </figure>
                            </li>
                        ))
                        
                        :
                        <li className='text-center text-gray-500 font-semibold text-xl'>No Reviews</li>
                        }
                        </ul>
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