import { useReviewProductQuery } from "../../../api/users/seller"
import { useParams,useNavigate } from "react-router"
import { useAppSelector } from "../../../hooks/hooks"
import SellerMain from "./SellerMain"
import { toast,Toaster } from "sonner"
import { useEffect, useState } from "react"
import HalfRating from "../../../components/Rating"
import AlertDialogSlide from "../../../components/Dialogue"

const Review = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [image,setImage] = useState(0)
    const [open, setOpen] = useState(false);
    const user = useAppSelector(state => state.user)
    const {data,status,isError} = useReviewProductQuery({id,sellerId:user._id},{
        skip:!id,
          refetchOnMountOrArgChange: true, // refetch when component mounts or argument changes
            refetchOnFocus: true, // refetch when window/tab gains focus
    })

    if(isError){
        toast.error( 'An error occurred while fetching the product review.')
       
    }
    const rate = data?.data.rating?.rate.reduce((a,c)=>a +c,0)
    const handleDialogue = () =>{
        setOpen(!open)
    }

    useEffect(()=>{},[data])
    // setRate(data.data.rating?.rate)
   return (
    <SellerMain>
        <div className="overflow-y-scroll h-[600px] ">
        {status === 'pending' && <div>Loading...</div>}
        {status === 'fulfilled' && (
            <div className="px-4 flex py-2 gap-3">
                <div className="flex flex-col gap-3 w-[400px]">
                <div className="w-[400px] h-[300px] ">
                    <figure className="w-full h-full" >
                        <img className="w-full h-full object-cover rounded-lg" src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_KEY}/image/upload/${data.data.image[image]}`} alt="" />
                    </figure>
                    
                </div>
                <ul className="w-full flex flex-wrap gap-2">
                        {
                            data.data.image && data.data.image?.length > 0 && data.data.image?.map((item:string,index:number) =>(
                                <li className="size-[50px] rounded-lg   ">
                                    <img  onClick={()=>setImage(index)} className={`size-full cursor-pointer border rounded-lg mx-auto object-contain ${index === image && 'border-black border-[3px]'}`} src={`https://res.cloudinary.com/dqvjddmln/image/upload/${item}`} alt={`${item}`} />
                                </li>
                            ))
                        }

                    </ul>

                    <div className="flex gap-2">
                        <button className="bg-green-500 text-white" onClick={()=> navigate(`/seller/product/update/${user._id}/${id}`)}>Update Product</button>
                        <button onClick={handleDialogue} className="bg-red-500 text-white">Delete Product</button>
                    </div>

                    <AlertDialogSlide open={open} openFunc={handleDialogue} id={id} sellerId={user._id}/>
                </div>
                <div className="flex flex-col gap-4">
                <h1 className="text-4xl"> {data.data.title}</h1>
                <div className="flex gap-2 my-2"><span className="text-2xl font-semibold">Price :</span> <span className={data.data.isDisCount ?'block text-2xl font-semibold' : 'hidden'}>	&#8358;{data.data.discountedPrice?.toLocaleString()}</span> <span className={`${data.data.isDisCount ? 'text-gray-500 line-through text-2xl font-semibold' : 'black font-semibold text-2xl'}`}>	&#8358;{data.data.price.toLocaleString()}</span> {data.data.isDisCount && <p className=" w-[40px] font-semibold rounded-lg text-white bg-red-500 text-xs grid place-content-center ">{Math.floor((data.data.price - data.data.discountedPrice ) / data.data.price * 100 )}%</p>}</div>
                
                <div className='flex gap-1'>
                    <HalfRating rating={rate}/>
                    <p className='text-[#666666]'>{data.data.rating?.count} reviews</p>
                    <p><span>Total Reviews:</span> {data.data.rating?.rate.length}</p>
                </div>
                <p>In Stock: {data.data.stock}</p>
                <p>Category: {data.data.category}</p>
                <div><span>Amount Sold: {data.data.amountSold}</span> <span>Amount Made: &#8358; {data.data.amountSold * data.data.price} </span></div>

                <div>
                    <h2 className="font-semibold text-xl">Description:</h2>
                    <article>{data.data.description}</article>
                </div>
                
                </div>
               
              
            </div>
        )}

        </div>


        <Toaster position="top-right"/>
    </SellerMain>
  )
}

export default Review