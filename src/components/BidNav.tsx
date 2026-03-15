
import logo from '../assets/img/a_design_text_logo_for_jibstores_black-removebg-preview.png'
import { motion } from "motion/react"
import { useBid } from '../hooks/useBid'

const BidNav = () => {
   
    const {setPage,page} = useBid()
    

  return (
    <nav className='flex px-4 py-5 items-center border-b shadow'>
        <div className='basis-[20%] '>
            <figure className='flex items-center gap-3'>
                <img 
                src={logo} 
                alt="Logo" 
                className='h-16 w-auto transition-transform duration-200 group-hover:scale-110' />
                <figcaption className='font-bold text-3xl'>Bid Master</figcaption>
            </figure> 
            
        </div>

        <div className='basis-[80%] flex justify-between'>
            <ul className='flex gap-5'>
                <motion.li onClick={()=> setPage('market_place')}  className={`cursor-pointer translate-y-0 ${page === 'market_place' && "border-b-2 border-red-600 pb-1"}`}>Marketplace</motion.li>
                <motion.li onClick={()=> setPage('bids')}  className={`cursor-pointer translate-y-0 ${page === 'bids' && "border-b-2 border-red-600 pb-1"}`}>My Bids </motion.li>
                <motion.li onClick={()=> setPage('watchlist')}  className={`cursor-pointer translate-y-0 ${page === 'watchlist' && "border-b-2 border-red-600 pb-1"}`}>Watchlist</motion.li>
                <motion.li onClick={()=> setPage('settings')}  className={`cursor-pointer translate-y-0 ${page === 'settings' && "border-b-2 border-red-600 pb-1"}`}>Settings</motion.li>
                <motion.li onClick={()=> setPage('listings')}  className={`cursor-pointer translate-y-0 ${page === 'listings' && "border-b-2 border-red-600 pb-1"}`}>My Listings</motion.li>
            </ul>

            <div className='flex gap-3'>
                <div><input className='border' placeholder='Search' type="search" name="" id="" /></div>
                <ul className='flex gap-4'>
                    <li>Icon 1</li>
                    <li>Icon 2</li>
                </ul>
            </div>
        </div> 
    </nav>
  )
}

export default BidNav