import {  useState} from 'react'
import SellerMain from './SellerMain'
import { useForm, SubmitHandler } from "react-hook-form";
import { toast,Toaster } from 'sonner';
import { useAddProductMutation,useUploadImageMutation,useDeleteImagePublicIdMutation } from '../../../api/users/seller';
import { useAppSelector } from '../../../hooks/hooks';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import {  ProductInputs } from '../../../types';
// import { motion } from 'framer-motion';

const AddProduct = () => {
    const [isDiscount, setIsDiscount] = useState(false);
    const [image, setImage] = useState([]);
    const [imageLoading,setImageLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState('');
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string[]>([])
    const [keywordName,setKeyWordName] = useState('')
    const [keyword, setKeyword] = useState([])
    const [addProduct] = useAddProductMutation()
    const [Upload] =useUploadImageMutation()
    const user = useAppSelector(state=> state.user)
    const navigate = useNavigate()
    const [deleteImageById] = useDeleteImagePublicIdMutation()
    
    // const parentVariant ={
    //         hidden:{opacity:0},
    //         visible:{
    //             opacity:1,
    //             transition:{
    //               staggerChildren:1,
    //             //   repeat:Infinity
    //             }
    //     }
    // }
    // const childVariant={
    //     hidden:{opacity:0, y:20},
    //     visible:{opacity:1, y:0,
    //     transition: {
    //   duration: 0.8,
    //   repeat: Infinity,
    //   repeatType: "loop",
    //   ease: "easeInOut",
    //   repeatDelay:0.5
    // },
    //     }
    // }

    

    const handleFileChange = async(event) => {
        const files = event.target.files;
        const data = new FormData()
        for(let i = 0; i < files.length; i++){
            data.append('files',files[i])
        }
        setImageLoading(true)
        
        try {
            const res = await Upload(data).unwrap()
            setImage((prev)=>[...prev, ...res.data])
            setImageLoading(false)
        } catch (error) {
            console.log(error)
            toast.error('Failed to upload Image')
            setImageLoading(false)
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

    const deleteKeyword = (index:number) =>{
         keyword.splice(index,1)
        setKeyword((prev)=>[ ...prev,...keyword])
    }

    const deleteImageUrl = (index:number) =>{
        uploadedImageUrl.splice(index,1)
        setUploadedImageUrl(()=>[...uploadedImageUrl])
    }

    const deleteImage = async(index:number,id:string) =>{
        image.splice(index,1)
        setImage(()=>[...image])
        try {
            const res = await deleteImageById({id}).unwrap()
            console.log(res.data.message)
            
        } catch (error) {
            console.log(error)
        }
        
    }


    const addImageUrl = () =>{

        if(imageUrl === ''){
            toast.error('The image link cannot be empty')
            return
        }
        setUploadedImageUrl((prev) =>[...prev , imageUrl])
        setImageUrl('')
    } 
    
    const {
        register,
        handleSubmit, 
        setValue,
        formState: { errors },
      } = useForm<ProductInputs>()
      const onSubmit: SubmitHandler<ProductInputs> = async(data) =>{
        setTimeout(()=>{
            // setIsDisabled(true)
        },5000)
        try {
        await addProduct({id:user._id,body:data}).unwrap()
        navigate(`/seller/product/${user._id}`)
        
        } catch (error) {
            console.log(error)
        }
        
    }

    

    if(image.length > 0){
        setValue('uploadedImage',image)
      }else{
        setValue('fileLink',uploadedImageUrl)
        setValue('uploadedImage',undefined)
        
      }
      setValue('sellerName',user.name)
      setValue('keywords',keyword)


  const handleCheckboxChange = (e) => {
    setIsDiscount((e.target as HTMLInputElement).checked)
  };
    

  return (
    <SellerMain>
        <div className=' overflow-y-scroll h-[600px]'>
        <h1 className='text-center my-3'>Add Product</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='w-[60%] flex flex-col gap-4 mx-auto min-h-[500px] bg-white px-4 py-6 rounded-xl'>
        <div>
            <label htmlFor="title" className='block text-gray-700  font-bold mb-2'>Product Name*</label>
            <input {...register("title",{
                required: "Product Name is required",
                minLength:{
                    value:3,
                    message: "Product Name must be at least 3 characters long"
                },
            })} type="text" name="title" id="title" className='!h-[48px] !border-[2px] !border-[#232321]' placeholder='Eg. Iphones, Car etc...' />
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
            })} type="number" name="price" id="price" className='!h-[48px] px-4 py-2 rounded-[10px] w-full border-[2px] !border-[#232321]' placeholder='Eg. 40000' />
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
            } name="description" id="description" placeholder='Eg.' cols={50} rows={10} className='!h-[180px] px-4 py-2 resize-none !border-[2px] !border-[#232321] rounded-[10px] text-[#212121] w-full '></textarea>
            {errors.description && <span className=' font-semibold text-red-500'>{errors.description.message}</span>}
        </div>

        <div>
            <label htmlFor="" className='block text-gray-700  font-bold mb-2'>Category*</label>
            <select {...register('category',{
                required: "Category is required",
            })} id="categorySelect" className='h-[48px] rounded-[10px] w-full !border-[2px] !border-[#232321]'>
                <option value="" hidden disabled>--Select a Category--</option>
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
            <input min={0} {...register('stock',{
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
                    } 
                    onClick={handleCheckboxChange} 
                    checked={isDiscount} 
                    className='cursor-pointer' 
                    type="checkbox" 
                    name="isDisCount" id="isDisCount" />
                    <label htmlFor="discount">Discount</label>
            </div>

        {isDiscount && 
            <div>
            <label htmlFor="" className='block text-gray-700  font-bold mb-2'>Discount Price</label>
            <input {
                ...register('discountedPrice',{
                    pattern:{
                        value: /^[0-9]+$/, // Pattern for positive integers
                         message: 'Please enter a valid number'
                     }
                })
            } type="number" name="discountedPrice" id="discountedPrice" className='!h-[48px] px-4 py-2 rounded-[10px] w-full border-[2px] !border-[#232321]' placeholder='Eg. 10000' />
              {errors.discountedPrice && <span className='font-semibold text-red-500'>{errors.discountedPrice.message}</span>}
        </div>
        }
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

        <div className='flex flex-wrap gap-2'>{
            image.length > 0 && image &&image.map((images,index)=>(
                <figure className='border w-[250px] h-[220px] rounded-xl relative'>
                    <div onClick={()=> deleteImage(index,images)} className='absolute text-white -top-3 -right-2 bg-gray-500 size-[20px] grid place-content-center rounded-full cursor-pointer'><IoClose className='size-4'/></div>
                    <img src={`https://res.cloudinary.com/dqvjddmln/image/upload/${images}`} className='w-full h-full object-contain' alt={`image of ${images}`} />
                </figure>
            ))}</div>

           
          {imageLoading && <div >
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" height="350px"/>
            </Box>
            </div>}
        
        </div>




        <div className='flex items-center justify-between'>

            <div className='border basis-[20%]'></div>
            <span>OR Upload image with links</span>
            <div className='border basis-[20%]'></div>
        </div>

        <div>
        <label htmlFor="fileLink" className='block text-gray-700  font-bold mb-2'>Image Links</label>
            <input {...register("fileLink",{
                minLength:{
                    value:3,
                    message: "Product Name must be at least 3 characters long"
                },
            })} type="text" name="fileLink" id="fileLink" value={imageUrl}  onChange={(e)=>setImageUrl(e.target.value)} className='!h-[48px] !border-[2px] !border-[#232321]' placeholder='Eg. Iphones, Car etc...' />
            {errors.fileLink && <span className=' font-semibold text-red-500'>{errors.fileLink.message}</span>}

            <div className='flex justify-start mt-4'>
            <button type='button' onClick={addImageUrl} className='bg-[black] hover:bg-[#313131] active:bg-black duration-300 text-white w-[20%]'>Add Image</button>
        </div>
        
        <div className={`${uploadedImageUrl.length === 0 ? 'hidden' : 'flex flex-wrap gap-2 py-3'}`}>
            {uploadedImageUrl.length> 0 && uploadedImageUrl && uploadedImageUrl.map((item,index)=>(
                <figure className='border w-[250px] h-[220px] rounded-xl relative'>
                    <div onClick={()=> deleteImageUrl(index)} className='absolute text-white -top-3 -right-2 bg-gray-500 size-[20px] grid place-content-center rounded-full cursor-pointer'><IoClose className='size-4'/></div>
                    <img src={item} className='w-full h-full object-contain' alt={`image of ${item}`} />
                </figure>
            ))}
        </div>

        </div>


        <div className='flex justify-end mt-4'>
            <button 
            // disabled={isDisabled} 
            className='bg-[black] hover:bg-[#313131] active:bg-black disabled:bg-[#313131] duration-300 text-white w-[20%]'>
                {/* {isDisabled?
                <motion.p variants={parentVariant} initial='hidden' animate="visible">
                    Loading
                    <motion.span variants={childVariant}>.</motion.span>
                    <motion.span variants={childVariant}>.</motion.span>
                    <motion.span variants={childVariant}>.</motion.span></motion.p> 
                : 
                'Add Product'} */}
            </button>
        </div>


        </form>
        </div>
        <Toaster position='top-right' />
    </SellerMain>
  )
}

export default AddProduct