import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import axios from 'axios'
import { useGetAllProductQuery } from '../api/users/buyer'

const BestSelling = () => {
  const {data,status} = useGetAllProductQuery()
  console.log(data.data)
  // setProduct(data?.data)
  
  return (
    <div className='w-[90%] mx-auto flex flex-col gap-9 my-8 border-y-[2px] py-9'>
      <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <div className="w-[20px] h-[40px] bg-[#DB4444] rounded"></div> 
                <h5 className="font-semibold text-[#DB4444]">This Month</h5>
            </div>

            <div className='flex justify-between items-center'>
                <h2 className="text-[36px] font-semibold">Best Selling Products</h2>
                <div><button className='bg-[#DB4444] text-white h-[56px] w-[159px] rounded hover:bg-[#9f3131] duration-200'>View All</button></div>
            </div>            
        </div>
      
      <div className='h-fit  flex justify-between  py-4 '>
      {data?.data && data?.data.length > 0 && data?.data.splice(0,4).map((item)=>(
        <ProductCard name={item.title} img={item.image} price={item.price} rating={item.rating} />
      ))}
      </div>
      </div>
  )
}

export default BestSelling