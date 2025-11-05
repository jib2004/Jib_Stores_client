import { Link } from 'react-router'
import Carousel from './Carousel'

const AdandCategories = () => {
  const categories = [
    { name: "Women's Fashion", icon: "👗" },
    { name: "Men's Fashion", icon: "👔" },
    { name: "Electronics", icon: "📱" },
    { name: "Home & Lifestyle", icon: "🏠" },
    { name: "Medicine", icon: "💊" },
    { name: "Sports & Outdoor", icon: "⚽" },
    { name: "Baby's & Toys", icon: "🧸" },
    { name: "Groceries", icon: "🛒" },
    { name: "Health & Beauty", icon: "💄" }
  ]

  return (
    <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
      <div className='flex flex-col  lg:flex-row gap-6'>
        {/* Categories Sidebar - Hidden on mobile, shown on large screens */}
        <div className='hidden lg:block lg:w-80'>
          <div className='card p-6'>
            <h2 className='heading-4 text-lg mb-6 text-neutral-900'>Shop by Category</h2>
            <nav>
              <ul className=''>
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link 
                      to="/" 
                      className='flex items-center gap-3 px-4 py-2 rounded-xl text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 group'
                    >
                      <span className='text-lg group-hover:scale-110 transition-transform duration-200'>
                        {category.icon}
                      </span>
                      <span className='body-medium font-medium'>{category.name}</span>
                      <svg className='w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Hero Carousel */}
        <div className='flex-1'>
          <div className='card overflow-hidden'>
            <Carousel/>
          </div>
        </div>
      </div>

      {/* Mobile Categories - Horizontal scroll on mobile */}
      <div className='lg:hidden w-screen mt-6 pr-4 '>
        <h2 className='heading-4 text-lg mb-4 px-2'>Shop by Category</h2>
        <div className='flex gap-3 overflow-x-auto pb-4 px-2 scrollbar-hide'>
          {categories.map((category, index) => (
            <Link 
              key={index}
              to="/" 
              className='flex-shrink-0 flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-200 min-w-[100px]'
            >
              <span className='text-2xl'>{category.icon}</span>
              <span className='text-xs font-medium text-center text-neutral-700 leading-tight'>
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AdandCategories