import {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router'
import { useGetSearchResultsQuery } from '../../api/users/buyer'
import { productDetails } from '../../types'
import App from '../../App'

const SearchPage = () => {
    const [products,setProducts] = useState<productDetails[] | null>(null)
    const {query} = useParams()
    const {data} =useGetSearchResultsQuery(query,{
          skip:!query,
        refetchOnReconnect: true,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    })

    useEffect(()=>{
        setProducts(data?.data)
    },[data])

  return (
    <App>
    <div>
        {
        products && products.length > 0 ? 
        <div className='space-y-4 p-4 md:p-8'>
              {products.map((product) => (
        <Link
        to={`/user/product/${product._id}`} 
          key={product._id}
          className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition cursor-pointer"
        >
          {/* Product Image */}
          <div className="w-24 h-24 flex-shrink-0">
            <img
              src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_KEY}/image/upload/${product?.image[0]}`}
              alt={product.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800">
              {product.title}
            </h3>

            <p className="text-sm text-gray-500 line-clamp-2">
              {product.description}
            </p>

            {/* Category */}
            <p className="text-xs mt-1 text-blue-600 font-medium">
              {product.category}
            </p>

            {/* Price */}
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xl font-bold text-gray-800">
                ₦{product.isDisCount ? product.discountedPrice : product.price}
              </span>

              {product.isDisCount && (
                <span className="text-sm text-gray-400 line-through">
                  ₦{product.price}
                </span>
              )}
            </div>

            {/* Ratings */}
            {product?.rating?.rate && product.rating.rate.length > 0 && (
              <div className="flex items-center mt-1">
                {/* <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> */}
                <span className="text-sm ml-1 text-gray-600">
                  {(
                    product.rating.rate.reduce((a, b) => a + b, 0) /
                    product.rating.rate.length
                  ).toFixed(1)}{" "}
                  ({product.rating.count ?? 0})
                </span>
              </div>
            )}

            {/* Stock */}
            <p className="text-sm mt-2 text-gray-700">
              Stock:{" "}
              <span
                className={
                  product.stock && product.stock > 0
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {product.stock}
              </span>
            </p>
          </div>

          {/* Right Side */}
          <div className="flex flex-col justify-between text-right">
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                product.isInspected
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {product.isInspected ? "Inspected" : "Not Inspected"}
            </span>

            {product.isSold && (
              <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">
                Sold
              </span>
            )}
          </div>
        </Link>
      ))}
        </div> 
        : 
        <div className='h-screen flex flex-col justify-center items-center'>
        <h2 className="text-xl xl:text-2xl font-semibold text-gray-700">
        No results found
      </h2>

      {query && (
        <p className="mt-2 text-gray-500">
          We couldn’t find anything matching "<span className="font-medium">{query}</span>"
        </p>
      )}

      <p className="mt-4 text-gray-400 text-sm">
        Try searching with different keywords.
      </p>
        </div> 
        }</div>
        </App>
  )
}

export default SearchPage