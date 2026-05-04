import {useState,useEffect} from 'react'
import { useGetBidProductsQuery } from '../../api/users/bid'
import notFound from "../../assets/img/no-product-found.png"
import ProductCard from '../BidComponents/ProductCard'
import { ProductProp } from '../../types'

const MaketPlace = () => {
  const {data,isError,error,isLoading} = useGetBidProductsQuery(undefined)
  const [products,setProducts] = useState<ProductProp[]>([])

  if(isError){
    console.log(error)
  }

  

useEffect(() => {
  if (data) {
    setProducts(data.data.map(product => JSON.parse(product)));
  }
}, [data]);


  return (
    <div className='mt-8'>
    {isLoading ? 
    <h1>Loading...</h1>
    :
    <>
      { products.length === 0 && 
      <div className='h-[calc(100vh-200px)] flex flex-col justify-center items-center'>
        <figure>
          <img src={notFound} alt="No Products Image" />
        </figure>
      </div> 
      }

      <div className='grid grid-cols-3 gap-4 mx-auto w-fit pb-7'>
          {products && products.map(p=>(
            <div >
              <ProductCard 
              name={p.name } 
              description={p.description}
              image={p.image}
              startingPrice={p.startingPrice}
              currentPrice={p.currentPrice}
              endTime={p.endTime}
              userName={p.userName}
              startTime={p.startTime}
              userId={p.userId}
              reference={p.reference}
              />
            </div>
          ))}
      </div>
    </>
  }
    
    </div>
  )
}

export default MaketPlace