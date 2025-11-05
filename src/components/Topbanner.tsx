import { FaXmark } from "react-icons/fa6";
import { Link } from 'react-router';
import gsap from 'gsap';

const Topbanner = () => {

     const handleDisplay = () =>{
        gsap.to('.top-banner',{
            y:-150,
            duration: 1,
            ease: "power1.out",
            display:"none"
        })
    }
  
  return (
    <div className='bg-gradient-to-r from-fuchsia-600 via-rose-500 to-amber-400 text-white relative overflow-hidden top-banner shadow-md ring-1 ring-white/10'>
        <div className='absolute inset-0 bg-white/10 mix-blend-overlay'></div>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center justify-center h-12 sm:h-10 text-center'>
                <div className='flex items-center gap-2'>
                    <svg className='w-4 h-4 text-white drop-shadow' fill='currentColor' viewBox='0 0 20 20'>
                        <path fillRule='evenodd' d='M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z' clipRule='evenodd' />
                    </svg>
                    <p className='text-sm font-semibold tracking-wide'>
                        🎉 Sign up and get <span className='font-extrabold text-yellow-200'>10% off</span> your first order! 
                        <Link 
                            to={'/register'} 
                            className='ml-2 underline underline-offset-4 decoration-white/80 hover:decoration-transparent hover:text-white transition-colors duration-200 font-bold'
                        >
                            Sign Up Now
                        </Link>
                    </p>
                </div>
                
                <button 
                    onClick={handleDisplay}
                    className='absolute right-4 p-1 rounded-full hover:bg-white/20 active:bg-white/25 transition-colors duration-200 focus-ring'
                    aria-label='Close banner'
                >
                    <FaXmark className='w-4 h-4'/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Topbanner