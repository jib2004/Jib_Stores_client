import {useState} from 'react'
import totalSpent from '../../assets/img/total_spent_img.png'
import ActiveBid from '../BidComponents/ActiveBid'
import Won from '../BidComponents/Won'
import Lost from '../BidComponents/Lost'
import Watchlist from './Watchlist'

const Bids = () => {
  const [subSection,setSubSection] = useState<string>('active_bid')
  return (
    <div id='bid-container' className='border flex flex-col items-center pt-8 min-h-screen '>
      <div className='mb-12 w-[80%] '>
        <ul className='flex items-center  gap-5'>
          <li className='border w-1/3 h-[143px] rounded-3xl shadow-md p-6'>
            <div>
              <figure className='flex justify-between items-center'>
                <figcaption className='leading-6 text-[14px]'>Total Spent</figcaption>
                <img src={totalSpent} className='w-6 h-4' alt="logo" />
              </figure>
            </div>

            <div>
              <h1 className='tracking-tighter'>$4250.00</h1>
            </div>

            <div>
              <span className=' font-semibold text-[14px]'>+5.2% from last month</span>
            </div>
          </li>
          <li className='border w-1/3 h-[143px] rounded-3xl shadow-md p-6'>
            <div>
              <figure className='flex justify-between items-center'>
                <figcaption className='leading-6 text-[14px]'>Total Spent</figcaption>
                <img src={totalSpent} className='w-6 h-4' alt="logo" />
              </figure>
            </div>

            <div>
              <h1 className='tracking-tighter'>$4250.00</h1>
            </div>

            <div>
              <span className=' font-semibold text-[14px]'>+5.2% from last month</span>
            </div>
          </li>
          <li className='border w-1/3 h-[143px] rounded-3xl shadow-md p-6'>
            <div>
              <figure className='flex justify-between items-center'>
                <figcaption className='leading-6 text-[14px]'>Total Spent</figcaption>
                <img src={totalSpent} className='w-6 h-4' alt="logo" />
              </figure>
            </div>

            <div>
              <h1 className='tracking-tighter'>$4250.00</h1>
            </div>

            <div>
              <span className=' font-semibold text-[14px]'>+5.2% from last month</span>
            </div>
          </li>
        </ul>
      </div>

      <div className='flex flex-col w-[80%] gap-8 mb-8'>
        <nav className=' border-b-2'>
          <ul className='flex gap-9'>
            <li onClick={()=> setSubSection("active_bid")} className={`uppercase tracking-wide font-bold leading-5 text-[18px] pb-3 cursor-pointer ${subSection === 'active_bid' && "border-b-4"} `}>Active Bids</li>
            <li onClick={()=> setSubSection("won")} className={`uppercase tracking-wide font-bold leading-5 text-[18px] pb-3 cursor-pointer ${subSection === 'won' && "border-b-4"}`}>Won</li>
            <li onClick={()=> setSubSection("lost")} className={`uppercase tracking-wide font-bold leading-5 text-[18px] pb-3 cursor-pointer ${subSection === 'lost' && "border-b-4"}`}>Lost</li>
            <li onClick={()=> setSubSection("watchlist")} className={`uppercase tracking-wide font-bold leading-5 text-[18px] pb-3 cursor-pointer ${subSection === 'watchlist' && "border-b-4"}`}>Watchlist</li>
          </ul>
        </nav>

        <div id='sub-section'>
        {subSection === 'active_bid' && <ActiveBid/>}
        {subSection === 'won' && <Won/>}
        {subSection === 'lost' && <Lost/>}
        {subSection === 'watchlist' && <Watchlist/>}


        </div>
      </div>
    </div>
  )
}

export default Bids