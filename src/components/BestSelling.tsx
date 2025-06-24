
import { useGetAllProductQuery } from "../api/users/buyer"

const BestSelling = () => {
  const { data, isLoading } = useGetAllProductQuery(undefined)
  // console.log(data)
  return (
    <div className='w-[90%] mx-auto flex flex-col gap-9 my-8 border-y-[2px] py-6'>
        <div className='h-fit  flex justify-between  py-4 '>
          <h1 className='text-2xl font-bold'>Best Selling</h1>
          <p className='text-sm text-gray-500'>View All</p>
        </div>
        <div className="h-fit  flex justify-between  py-4 w-full overflow-x-auto xl:w-auto">
          {isLoading ? (
            <>
              <div className="animate-pulse bg-gray-200 h-64 w-48 rounded-lg"></div>
              <div className="animate-pulse bg-gray-200 h-64 w-48 rounded-lg"></div>
              <div className="animate-pulse bg-gray-200 h-64 w-48 rounded-lg"></div>
              <div className="animate-pulse bg-gray-200 h-64 w-48 rounded-lg"></div>
              <div className="animate-pulse bg-gray-200 h-64 w-48 rounded-lg"></div>
            </>
          ) : (
            data?.data && data?.data.length > 0 && data?.data
              .filter((item: any) => item.amountSold > 0)
              .sort((a: any, b: any) => b.amountSold - a.amountSold)
              .slice(0, 5)
              .map((item: any, index: number) => (
                <div key={item._id} className="flex-shrink-0">
                  <div className="bg-white rounded-lg shadow-md p-4 w-48">
                    <img 
                      src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_KEY}/image/upload/${item.image[0]}`} 
                      alt={item.title} 
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                    <h3 className="font-semibold text-sm mb-2 truncate">{item.title}</h3>
                    <p className="text-lg font-bold text-green-600">₦{item.price?.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">Sold: {item.amountSold}</p>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
  )
}

export default BestSelling
