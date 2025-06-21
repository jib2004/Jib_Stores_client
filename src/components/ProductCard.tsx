import HalfRating from './Rating'

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
    // rating?:number,
    isFavorite?:boolean
}

const ProductCard = ({id,name,price,img,rating,isDiscounted,discountPrice}:productProp) => {
  return (
    <div className='w-[270px]  rounded-md h-[350px] cursor-pointer relative bg-white shadow-sm hover:shadow-lg duration-200'>
        <div className='bg-[#F5F5F5] h-[250px] rounded  flex justify-center items-center'>
            <div className='w-full h-full  flex justify-center items-center'>
                <img src={img} alt={`image of ${name}`} className='w-full h-full object-cover' />
            </div>
        </div>

        <div className='flex flex-col justify-around h-[100px] pl-2'>
            <h4 className='font-medium'>{name.length > 31 ? name.slice(0,25) +'...' : name}</h4>
            <div className='flex  items-center gap-2'>
            {isDiscounted && <p>{discountPrice}</p>} <p className={` ${isDiscounted && ' line-through text-[#666666]' }`}>&#8358;{price}</p>
        </div>

        <div className='flex gap-1'>
            <HalfRating rating={rating?.rate}/>
            <p className='text-[#666666]'>{rating?.count} reviews</p>
        </div>
    </div> 


    </div>
  )
}

export default ProductCard