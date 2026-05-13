import React from 'react'
import recent_icon from "../../assets/img/recent_icon.svg"
import MuiOrdersTable from './MuiOrdersTable'
import { Link } from 'react-router'

const OrderTable = () => {
  return (
    <section className='bg-white'>
        <div>
            <div className='flex items-center justify-between px-5 border-b'>
            <figure className='flex items-center gap-3 h-[97px]  '>
                <img src={recent_icon} alt="recent_icon" />
                <figcaption className='text-[#181C1E] font-semibold text-2xl'>Recent Orders</figcaption>
            </figure>

            <Link to={``} className='text-[#036780] font-bold'>View All Orders</Link>
            </div>

            <div>
                <MuiOrdersTable />
            </div>
        </div>
    </section>
  )
} 

export default OrderTable