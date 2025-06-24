import HalfRating from './Rating'
import { Link } from 'react-router'
import { IoIosAdd } from "react-icons/io";
import { TiMinus } from "react-icons/ti";
import { useAppDispatch,useAppSelector } from '../hooks/hooks';
import { setQuantity } from '../api/quatitySlice/quantitySlice';

type productProp={
    id?:string
    name: string,
    price: number,
    img:string,
    rating?:{
        rate: number,
        count: number
    },
    isDiscounted?:boolean,
    discountPrice?:number,
}



const ListPrduct = ({id,name,price,img,rating,isDiscounted,discountPrice}:productProp) => {
    const dispatch = useAppDispatch()
    const quantityProduct = useAppSelector(state => state.quantity)
    const quantityValue = quantityProduct.find(item => item.id === id)

  return (
    <div>
        <div>
    <div className='flex  gap-3'>
    <Link to={`/user/product/${id}`} className='w-[400px]  flex rounded-md  cursor-pointer relative bg-white shadow-sm hover:shadow-lg duration-200 p-4'>
           <div className='bg-[#F5F5F5]  rounded  flex justify-center items-center'>
               <div className='w-[50px] h-full  flex justify-center items-center'>
                   <img src={img} alt={`image of ${name}`} className='w-full h-full object-cover' />
               </div>
           </div>
   
           <div className='flex flex-col justify-around pl-2'>
               <h4 className='font-medium'>{name.length > 31 ? name.slice(0,25) +'...' : name}</h4>
               <div className='flex  items-center gap-2 font-semibold'>
               {isDiscounted && <p>{discountPrice}</p>} <p className={` ${isDiscounted && ' line-through text-[#666666]' }`}>&#8358;{price}</p>
           </div>
   
           <div className='flex gap-1'>
               <HalfRating rating={rating?.rate}/>
               <p className='text-[#666666]'>{rating?.count} reviews</p>
           </div>
       </div> 
   
       </Link>

       <div className='flex items-center gap-2 mt-3'>
        <button 
        onClick={() => dispatch(setQuantity({
            id,
            quantity:(quantityValue?.quantity || 0) + 1,
            
        }))}
        
        className='size-[40px] bg-black text-white font-bold text-3xl rounded-full flex items-center justify-center'><IoIosAdd/></button>
        <span className='text-xl'>{quantityValue?.quantity || 0}</span>
        <button 
        onClick={() => dispatch(setQuantity({
            id,
            quantity:(quantityValue?.quantity || 0) - 1,
            
        }))}
        className='size-[40px] bg-black text-white font-bold text-3xl rounded-full flex items-center justify-center'><TiMinus/></button>
       </div>
</div>
       <p className='text-lg font-semibold my-2'>
        <span>Total: &#8358;{quantityValue?.price ? quantityValue.price.toLocaleString() : (quantityValue?.basePrice || 0).toLocaleString()}</span>
            {/* <span className='text-gray-500'>Total:</span> &#8358;{isDiscounted ? discountPrice * quantity : price * quantity} */}
       </p>
       </div>
       </div>
  )
}

export default ListPrduct
