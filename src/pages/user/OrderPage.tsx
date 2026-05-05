import {useState,useMemo} from 'react'
import App from '../../App'
import { useGetUserOrdersQuery } from '../../api/users/buyer'
// import { useAppSelector,useAppDispatch } from '../../hooks/hooks'
import { useParams } from 'react-router'
// import { productDetails } from '../../types'
// import axios from 'axios'
// import { useNavigate } from 'react-router'
import StatusTag from '../../components/OrderTag'


const OrderPage = () => {
  const {id} = useParams()
  const [products, setProducts] = useState([]);
  const {data,error,status} = useGetUserOrdersQuery(id,{
    skip:!id
  })

  // console.log(data)

  if(status === 'rejected'){
    console.log(error)
  }


  useMemo(()=>{ 
          if(data){
            setProducts(data?.data)
          }
      },[data])
      

  return (
    <App>
      <h1 className='p-4'>ORDERS</h1>

       {
        products.length === 0 && (
          <div className=' h-svh md:h-[400px] flex justify-center items-center font-bold text-xl md:text-5xl'>
            No Orders!
          </div>
        )
      }

      <div className='flex flex-col gap-4 items-center p-4'>
        
          {products.length > 0 && products.map((item)=>(
            <div className='w-[80%] shadow-xl p-4 rounded-xl '>
              <div className='flex flex-col  gap-3'>
                <ul  className='flex justify-between'>
                  <li>Order Number: <span>{item.orderNumber}</span></li>
                </ul>

                <div className='flex flex-col gap-4 '>
                  {item?.productDetails.length > 0  && item?.productDetails.map((p)=>(
                    <div className='flex gap-4 items-center rounded-lg shadow-md cursor-pointer justify-between p-3'>
                      <div className='flex gap-4 items-center'>
                       <figure className='size-[150px]  '>
                    <img className='size-full object-contain rounded-xl' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_KEY}/image/upload/${p?.productImg}`} alt="" />
                  </figure>
                  <figcaption className='max-w-[700px]'>{p?.productName}</figcaption>
                  <p>X{p?.quantity}</p>
                    </div>

                    <div>
                  <span className=' capitalize'><StatusTag status={p?.orderStatus} /></span>
                  </div>
                    </div>
                  ))}
                 
                </div>
              </div>
            </div>
          ))}
      </div>
    </App>
  )
}

export default OrderPage
