import {useEffect, useState} from 'react'
import { useReviewProductQuery,useUpdateProductMutation,useDeleteImagePublicIdMutation,useUploadImageMutation } from '../../../api/users/seller'
import { useParams,useNavigate } from 'react-router'
import SellerMain from './SellerMain'
import { useForm, SubmitHandler } from "react-hook-form";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { useAppSelector } from '../../../hooks/hooks';

const UpdateProduct = () => {
    const {sellerId,id} = useParams()
    const navigate = useNavigate()
    const user = useAppSelector(state=>state.user)
    const {data,status} = useReviewProductQuery({id,sellerId},{
        skip:!id,
        refetchOnMountOrArgChange: true, // refetch when component mounts or argument changes
        refetchOnFocus: true, // refetch when window/tab gains focus
    })
    const [keywordName,setKeyWordName] = useState('')
    const [keyword, setKeyword] = useState([])
    const [isDiscount, setIsDiscount] = useState(false);
    const [productInfo,setProductInfo] = useState(null)
    const [productImages,setProductImages] = useState([])
    const [deleteImageById] = useDeleteImagePublicIdMutation()
    const [Upload] = useUploadImageMutation()
    const [update] = useUpdateProductMutation() 

      const handleFileChange = async(event) => {
        const files = event.target.files;
        const data = new FormData()
        for(let i = 0; i < files.length; i++){
            data.append('files',files[i])
        }
        // setImageLoading(true)
        
        try {
            const res = await Upload(data).unwrap()
            setProductImages((prev)=>[...prev, ...res.data])
            // setImageLoading(false)
        } catch (error) {
            console.log(error)
            // setImageLoading(false)
        }
    };

  const addkeyword = () =>{
            if(keywordName === ''){
                toast.error('The keyword cannot be empty')
                return
            }
            setKeyword((prev) =>[...prev , keywordName])
            setKeyWordName('')
        }
      
   const deleteKeyword = (index: number) => {
    if (!keyword) return;
    const newKeywords = keyword.filter((_, i) => i !== index);
    setKeyword(newKeywords);
  };

      const deleteImage = async(index:number,id:string) =>{
        if(!productImages) return;
        const newImages = productImages.filter((_, i) => i !== index);
        setProductImages(newImages)
        try {
            const res = await deleteImageById({id}).unwrap()
            console.log(res.data.message)
            
        } catch (error) {
            console.log(error)
        }
        
    }



          const {
            register,
            handleSubmit, 
            setValue,
            reset,
            formState: { errors },
          } = useForm<Inputs>({defaultValues:{
             title: '',
      price: '',
      description: '',
      category: '',
      stock: '',
      discountedPrice: ''
          }})
          const onSubmit: SubmitHandler<Inputs> = async(data) =>{
            
               
            try {
                const res = await update({id,sellerId,body:data}).unwrap()
                navigate(`/seller/product/${user._id}`)
            } catch (error) {
                console.log(error)
            }
            
        }

        setValue('keywords',keyword)
        setValue('image',productImages)
        setValue('sellerName',user.name)

        useEffect(()=>{
            if(data){
            setKeyword(data?.data.keywords) 
            setProductInfo(data?.data)
            setProductImages(data?.data.image)
            setIsDiscount(data?.data.isDisCount)
            reset({
                title: data.data.title || '',
                price: data.data.price || '',
                description: data.data.description || '',
                category: data.data.category || '',
                stock: data.data.stock || '',
                discountedPrice: data.data.discountedPrice || ''
            });
            }
        },[data,reset])

        

  return (
    <SellerMain>
        <div className=' overflow-y-scroll h-[600px]'>
        <h1 className='text-center my-3'>Update Product</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='w-[60%] flex flex-col gap-4 mx-auto min-h-[500px] bg-white px-4 py-6 rounded-xl'>
        <div>
            <label htmlFor="title" className='block text-gray-700  font-bold mb-2'>Product Name*</label>
            <input {...register("title",{
                required: "Product Name is required",
                minLength:{
                    value:3,
                    message: "Product Name must be at least 3 characters long"
                },
            })} type="text"   name="title" id="title" className='!h-[48px] !border-[2px] !border-[#232321]' placeholder='Eg. Iphones, Car etc...' />
            {errors.title && <span className=' font-semibold text-red-500'>{errors.title.message}</span>}
        </div>

        <div>
            <label htmlFor="price" className='block text-gray-700  font-bold mb-2'>Price*</label>
            <input {...register('price',{
                required: "Price is required",
                pattern:{
                   value: /^[0-9]+$/, // Pattern for positive integers
                    message: 'Please enter a valid number'
                },
                min:{
                    value: 1,
                    message: 'Price must be greater than 0'
                }
            })} type="number" name="price"  id="price" className='!h-[48px] px-4 py-2 rounded-[10px] w-full border-[2px] !border-[#232321]' placeholder='Eg. 40000' />
            {errors.price && <span className=' font-semibold text-red-500'>{errors.price.message}</span>}
        </div>

        <div>
            <label htmlFor="description" className='block text-gray-700  font-bold mb-2'>Description*</label>
            <textarea {
                ...register("description",{
                    required: "Description is required",
                    minLength:{
                        value:10,
                        message: "Description must be at least 10 characters long"
                    }
                })
            } name="description" id="description"  placeholder='Eg.' cols={50} rows={10} className='!h-[180px] px-4 py-2 resize-none !border-[2px] !border-[#232321] rounded-[10px] text-[#212121] w-full '></textarea>
            {errors.description && <span className=' font-semibold text-red-500'>{errors.description.message}</span>}
        </div>

        <div>
            <label htmlFor="" className='block text-gray-700  font-bold mb-2'>Category*</label>
            <select  {...register('category',{
                required: "Category is required",
            })} id="categorySelect"  className='h-[48px] rounded-[10px] w-full !border-[2px] !border-[#232321]'>
                <option value="" selected hidden  disabled>{data?.data.category}</option>
                <option value="electronics">Electronics</option>
                <option value="computing">Computing</option>
                <option value="phones">Phones</option>
                <option value="fashion">Fashion</option>
                <option value="gaming">Gaming</option>
                <option value="sport_outdoor">Sport & Outdoor</option>
                <option value="home_lifestyle">Home & Lifestyle</option>
                <option value="babies_toys">Baby's & Toys</option>
                <option value="automobile">Automobile</option>
                <option value="pets">Pets</option>
                <option value="groceries">Groceries</option>
            </select>
            {errors.category && <span className='font-semibold text-red-500'>{errors.category.message}</span>}
        </div>

        <div>
            <label htmlFor="stock" className='block text-gray-700  font-bold mb-2'>Stock Quantity*</label>
            <input  {...register('stock',{
                required: "Stock is required",
                pattern:{
                   value: /^[0-9]+$/, // Pattern for positive integers
                    message: 'Please enter a valid number'
                },
                min:{
                    value: 1,
                    message: 'Price must be greater than 0'
                }
            })} type="number" name="stock" id="stock" className='!h-[48px] px-4 py-2 rounded-[10px] w-full border-[2px] !border-[#232321]' placeholder='Eg. 40' />

                {errors.stock && <span className='font-semibold text-red-500'>{errors.stock.message}</span>}
        </div>

        <div className='flex flex-col gap-3'>
            <div className='flex items-center gap-3'>
                
                    <input {
                        ...register('isDisCount')
                    } onClick={(e)=>{setIsDiscount(e.target.checked)}}  checked={isDiscount} className='cursor-pointer' type="checkbox" name="isDisCount" id="isDisCount" />
                    <label htmlFor="discount">Discount</label>
            </div>

        
            <div>
            <label htmlFor="" className='block text-gray-700  font-bold mb-2'>Discount Price</label>
            <input {
                ...register('discountedPrice',{
                    pattern:{
                        value: /^[0-9]+$/, // Pattern for positive integers
                         message: 'Please enter a valid number'
                     }
                })
            } type="number" defaultValue={productInfo?.discountedPrice} name="discountedPrice" id="discountedPrice" className='!h-[48px] px-4 py-2 rounded-[10px] w-full border-[2px] !border-[#232321]' placeholder='Eg. 10000' />
              {errors.discountedPrice && <span className='font-semibold text-red-500'>{errors.discountedPrice.message}</span>}
        </div>
        
        </div>

        <div className=' flex flex-col gap-2'>
            <label htmlFor="keywords" className='block text-gray-700  font-bold mb-2'>Keywords</label>
            <input {
                ...register('keywords')
            } type="text" name="keywords" id="keywords" onChange={(e)=>setKeyWordName(e.target.value)} value={keywordName} className='!h-[48px] !border-[2px] !border-[#232321]' placeholder='Eg. Iphones, Car etc...' />
            <div className='flex justify-start mt-4'>
            <button type='button' onClick={addkeyword} className='bg-[black] hover:bg-[#313131] active:bg-black duration-300 text-white w-[20%]'>Add Keyword</button>
        </div>
        <div className='flex flex-wrap gap-2 mt-3'>
        {
                keyword && keyword.length > 0 && keyword.map((tag,index)=>(
                    <div className=' font-semibold w-fit border px-2 py-1 rounded-3xl bg-black text-white relative'> <div onClick={()=> deleteKeyword(index)} className='absolute -top-3 -right-2 bg-gray-500 size-[20px] grid place-content-center rounded-full cursor-pointer'><IoClose className='size-4'/></div> {tag}</div>
                ))
            }
        </div>
        </div>

        <div className='flex flex-wrap gap-3'>
        {
            productImages?.length > 0 &&  productImages && productImages?.map((images,index)=>(
                <figure className='border w-[250px] h-[220px] rounded-xl relative'>
                    <div onClick={()=> deleteImage(index,images)} className='absolute text-white -top-3 -right-2 bg-gray-500 size-[20px] grid place-content-center rounded-full cursor-pointer'><IoClose className='size-4'/></div>
                    <img src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_KEY}/image/upload/${images}`} className='w-full h-full object-contain' alt={`image of ${images}`} />
                </figure>
            ))}
        </div>
        

         <div >
        <label htmlFor="image" className='block text-gray-700  font-bold mb-2'>Images</label>
        <div className='border-[3px] border-black w-[250px] h-[180px] rounded-[10px] relative'>
        <FaCloudUploadAlt className='size-20 absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]'/>

        <input 
        className='w-full h-full block cursor-pointer opacity-0' 
        {...register('image')} 
        type="file" 
        name="files" 
        id="files" 
        accept="image/*"
        multiple
        onChange={handleFileChange}
        />
        </div>
        {errors.image && <span className='text-red-500 font-semibold'>{errors.image.message}</span>}

        </div>

{/*            
          {imageLoading && <div >
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" height="350px"/>
            </Box>
            </div>}
         */}

        <div className='flex justify-end mt-4'>
            <button className='bg-[black] hover:bg-[#313131] active:bg-black duration-300 text-white w-[20%] py-4'>Update </button>
        </div>


        </form>
        </div>
    </SellerMain>
  )
}

export default UpdateProduct