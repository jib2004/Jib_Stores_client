// import HalfRating from './Rating'

type productProp={
    name: string,
    price: number,
    img:string,
    rating?:{
        rate: number[],
        count: number
    },
    isDiscounted?:boolean,
    discountPrice?:number,
    // rating?:number,
    isFavorite?:boolean
}

const ProductCard = ({name,price,img,isDiscounted,discountPrice}:productProp) => {
  return (
    <div className='group card-hover w-[330px] h-[330px] mx-auto cursor-pointer relative overflow-hidden rounded-2xl bg-white shadow-sm'>
        {/* Product Image Container */}
        <div className='relative bg-neutral-100 w-full h-2/3 rounded-t-2xl overflow-hidden'>
            <img 
                src={img} 
                alt={`${name} product image`} 
                className='w-full h-full object-contain transition-transform duration-300 group-hover:scale-105' 
            />
            
            {/* Discount Badge */}
            {isDiscounted && (
                <div className='absolute top-3 left-3'>
                    <span className='badge-error text-xs font-semibold px-2 py-1'>
                        Sale
                    </span>
                </div>
            )}
            
            


        </div>

        {/* Product Info */}
        <div className='p-4 space-y-2 h-1/3 overflow-hidden flex flex-col justify-between'>
            <h4 className='heading-4 text-base line-clamp-2 min-h-[3rem]'>
                {name.length > 50 ? name.slice(0,47) + '...' : name}
            </h4>
            
            {/* Price */}
            <div className='flex items-center gap-2'>
                {isDiscounted ? (
                    <>
                        <span className='text-lg font-bold text-neutral-900'>
                            &#8358;{discountPrice?.toLocaleString()}
                        </span>
                        <span className='text-sm text-neutral-500 line-through'>
                            &#8358;{price.toLocaleString()}
                        </span>
                    </>
                ) : (
                    <span className='text-lg font-bold text-neutral-900'>
                        &#8358;{price.toLocaleString()}
                    </span>
                )}
            </div>

            {/* Rating - Placeholder for future implementation */}
            <div className='flex items-center gap-1'>
                <div className='flex items-center'>
                    {[...Array(5)].map((_, i) => (
                        <svg key={i} className='w-4 h-4 text-warning-400' fill='currentColor' viewBox='0 0 20 20'>
                            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                        </svg>
                    ))}
                </div>
                <span className='body-small text-neutral-500 ml-1'>(0)</span>
            </div>
        </div>
    </div>
  )
}

export default ProductCard