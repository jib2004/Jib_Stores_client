import React from 'react'
import { appProps } from '../types'
import profile_icon from "../assets/img/profile_icon.svg"
import order_icon from "../assets/img/order_icon.svg"
import { useNavigate } from 'react-router'
import { useAppSelector } from '../hooks/hooks'

const ProfileLayout = ({children}:appProps) => {

  const navigate = useNavigate()
  const {_id} = useAppSelector(state => state.user)

  return (
    <div className='flex flex-col bg-[#F1F4F6] min-h-screen gap-5 pt-6 px-5'>
      <div>
        <h2 className="text-[#181C1E] text-[32px] leading-10 -tracking-[0.32px] font-semibold">Account Settings</h2>
        <span className='text-[#3F484C] leading-6'> Manage your profile information and security</span>
      </div>

    <section className='flex gap-5'>
      <aside className='bg-white h-fit basis-[20%] p-4 rounded-xl'>
        <ul className='flex flex-col gap-4'>
          <li onClick={()=>navigate(`/profile/${_id}`)} className="px-2 py-3 border rounded-lg">
            <figure className='flex gap-2 items-center'>
              <img src={profile_icon} alt="profile_icon" />
              <figcaption className='text-[#036780] cursor-pointer leading-5 tracking-[0.7px] text-[14px] font-semibold'>Personal Info</figcaption>
            </figure>
          </li>
          <li onClick={()=> navigate(`/order-history/${_id}`)} className="px-2 py-3 border rounded-lg">
            <figure className='flex gap-2 items-center'>
              <img src={order_icon} alt="order_icon" />
              <figcaption className='text-[#036780] cursor-pointer leading-5 tracking-[0.7px] text-[14px] font-semibold'>Order History</figcaption>
            </figure>
          </li>
        </ul>
      </aside>
      
      <main className='basis-[80%] flex flex-col gap-8 pb-4'>{children}</main>
      </section>
    </div>
  )
}

export default ProfileLayout