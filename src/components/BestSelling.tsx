import ProductCard from "./ProductCard"
import { useGetAllProductQuery } from "../api/users/buyer"

const BestSelling = () => {
  const { data, isLoading, isError, error } = useGetAllProductQuery()

  // Handle loading state
  if (isLoading) {
    return (
      <div className="w-[90%] mx-auto flex flex-col gap-9 my-8 border-y-[2px] py-9">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-[20px] h-[40px] bg-[#DB4444] rounded"></div>
            <h5 className="font-semibold text-[#DB4444]">This Month</h5>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-[36px] font-semibold">Best Selling Products</h2>
            <div>
              <button className="bg-[#DB4444] text-white h-[56px] w-[159px] rounded hover:bg-[#9f3131] duration-200">
                View All
              </button>
            </div>
          </div>
        </div>
        <div className="h-fit flex justify-center items-center py-4">
          <div className="text-center">Loading products...</div>
        </div>
      </div>
    )
  }

  // Handle error state
  if (isError) {
    return (
      <div className="w-[90%] mx-auto flex flex-col gap-9 my-8 border-y-[2px] py-9">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-[20px] h-[40px] bg-[#DB4444] rounded"></div>
            <h5 className="font-semibold text-[#DB4444]">This Month</h5>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-[36px] font-semibold">Best Selling Products</h2>
            <div>
              <button className="bg-[#DB4444] text-white h-[56px] w-[159px] rounded hover:bg-[#9f3131] duration-200">
                View All
              </button>
            </div>
          </div>
        </div>
        <div className="h-fit flex justify-center items-center py-4">
          <div className="text-center text-red-500">Error loading products. Please try again later.</div>
        </div>
      </div>
    )
  }

  // Check if data exists and has the expected structure
  const products = data?.data || []

  return (
    <div className="w-[90%] mx-auto flex flex-col gap-9 my-8 border-y-[2px] py-9">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-[20px] h-[40px] bg-[#DB4444] rounded"></div>
          <h5 className="font-semibold text-[#DB4444]">This Month</h5>
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-[36px] font-semibold">Best Selling Products</h2>
          <div>
            <button className="bg-[#DB4444] text-white h-[56px] w-[159px] rounded hover:bg-[#9f3131] duration-200">
              View All
            </button>
          </div>
        </div>
      </div>

      <div className="h-fit flex justify-between py-4">
        {products.length > 0 ? (
          products
            .slice(0, 4)
            .map((item, index) => (
              <ProductCard
                key={item.id || index}
                name={item.title}
                img={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))
        ) : (
          <div className="w-full text-center py-8">
            <p className="text-gray-500">No products available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BestSelling
