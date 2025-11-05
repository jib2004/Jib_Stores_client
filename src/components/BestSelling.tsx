
import { useGetAllProductQuery } from "../api/users/buyer"
import { Link } from "react-router"

const BestSelling = () => {
  const { data, isLoading } = useGetAllProductQuery(undefined)
  
  return (
    <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      {/* Section Header */}
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h2 className='heading-2 text-2xl lg:text-3xl text-neutral-900 mb-2'>Best Selling Products</h2>
          <p className='body-large text-neutral-600'>Discover our most popular items</p>
        </div>
        <Link 
          to="/products" 
          className='btn-secondary hidden sm:flex items-center gap-2 group'
        >
          View All
          <svg className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-200' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
          </svg>
        </Link>
      </div>

      {/* Products Grid */}
      <div className="relative">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="card p-4 space-y-4">
                  <div className="bg-neutral-200 h-40 rounded-xl"></div>
                  <div className="space-y-2">
                    <div className="bg-neutral-200 h-4 rounded w-3/4"></div>
                    <div className="bg-neutral-200 h-4 rounded w-1/2"></div>
                    <div className="bg-neutral-200 h-6 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
              {data?.data && data?.data.length > 0 && data?.data
                .filter((item) => item.amountSold > 0)
                .sort((a, b) => b.amountSold - a.amountSold)
                .slice(0, 5)
                .map((item) => (
                  <Link 
                    key={item._id} 
                    to={`/product/${item._id}`}
                    className="group"
                  >
                    <div className="card p-4 group-hover:shadow-medium transition-all duration-300">
                      {/* Bestseller Badge */}
                      <div className="relative mb-4">
                        <div className="absolute top-2 left-2 z-10">
                          <span className="badge-success text-xs px-2 py-1">
                            🏆 Bestseller
                          </span>
                        </div>
                        <div className="aspect-square overflow-hidden rounded-xl bg-neutral-100">
                          <img 
                            src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_KEY}/image/upload/${item.image[0]}`} 
                            alt={item.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>
                      
                      {/* Product Info */}
                      <div className="space-y-2">
                        <h3 className="body-medium font-semibold text-neutral-900 line-clamp-2 group-hover:text-primary-700 transition-colors duration-200">
                          {item.title}
                        </h3>
                        
                        <div className="flex items-center justify-between">
                          <p className="heading-4 text-lg font-bold text-success-600">
                            ₦{item.price?.toLocaleString()}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-neutral-500">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            {item.amountSold} sold
                          </div>
                        </div>
                        
                        {/* Rating Stars Placeholder */}
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg key={i} className="w-3 h-3 text-warning-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                          ))}
                          <span className="text-xs text-neutral-500 ml-1">(4.8)</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              }
            </div>
            
            {/* Mobile View All Button */}
            <div className="mt-8 text-center sm:hidden">
              <Link to="/products" className="btn-primary">
                View All Products
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default BestSelling
