import { Link } from "react-router"
import { useGetAllProductQuery } from "../api/users/buyer"
import ProductCard from "./ProductCard"
import { Suspense } from "react"
import ProductCardSkeleton from "./ProdctCardKeleton"
import { productDetails } from "../types"

const GetAllProducts = () => {
    const {data,status,error} = useGetAllProductQuery(undefined)
    // console.log(data)
    if(error){
        console.log(error)
    }
  return (
    <div className='w-[90%] mx-auto flex flex-col gap-9 my-8 border-y-[2px] py-6'>
        <div className='h-fit  flex justify-between  py-4 '>
          <Suspense fallback={<ProductCardSkeleton/>}>
          {status === 'pending'? 
          <>
          <ProductCardSkeleton/>
          <ProductCardSkeleton/>
          <ProductCardSkeleton/>
          <ProductCardSkeleton/>
          <ProductCardSkeleton/>
          </>
          :
          <div className="h-fit  flex justify-between  py-4 w-full overflow-x-auto xl:w-auto">
          {data?.data && data?.data.length > 0 && data?.data.map((item:productDetails)=>(
          <Link key={item._id} to={`/user/product/${item._id}`}> <ProductCard name={item.title} img={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_KEY}/image/upload/${item.image[0]}`} price={item.price}  isDiscounted={item.isDisCount} discountPrice={item.discountedPrice} /></Link>
          ))}
          </div>
          }
      </Suspense>
      </div>
    </div>
  )
}

export default GetAllProducts