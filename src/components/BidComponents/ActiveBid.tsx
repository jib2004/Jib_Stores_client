import React from 'react'
import BidCard from './BidCard'
import { BidProp } from '../../types';


const watches: BidProp[] = [
  {
    name: "Vintage Rolex Submariner",
    description:
      "A rare 1962 ref. 5512 in exceptional condition. Original tropical dial with double-signed crown and punched papers. One of fewer than 30 known examples.",
    currentBid: 8500,
    yourBid: 8600,
    img: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=400&q=80",
  },
  {
    name: "Patek Philippe Nautilus",
    description:
      "Reference 5711/1A-010 in stainless steel. Full set with box, papers, and two extra links. Last production year before discontinuation making this an instant collectible.",
    currentBid: 142000,
    yourBid: 138000,
    img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80",
  },
  {
    name: "Audemars Piguet Royal Oak",
    description:
      "Iconic 39mm ref. 15202ST Jumbo Extra-Thin. Slate grey dial with original bracelet. Serviced in 2023 by AP with full documentation. Near mint condition.",
    currentBid: 67000,
    yourBid: 71000,
    img: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&q=80",
  },
  {
    name: "Omega Speedmaster Moonwatch",
    description:
      "Flight-qualified 1969 Speedmaster worn during Apollo lunar missions. Ref. 105.012 with original hesalite crystal, tritium dial, and NASA-issue strap. Comes with provenance letter.",
    currentBid: 24000,
    yourBid: 24500,
    img: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=400&q=80",
  },
];

const ActiveBid = () => {
  return (
    <div>
        <div className='grid grid-cols-4 gap-6'>
            {watches.map((watch) => (
        <BidCard 
        name={watch.name} 
        description={watch.description}
        currentBid={watch.currentBid}
        yourBid={watch.yourBid}
        img={watch.img}
        />
      ))}
        {/* <BidCard 
        name="Vintage Rolex Submariner"
        description="A rare 1962 ref. 5512 in exceptional condition. Original tropical dial with double-signed crown and punched papers. One of fewer than 30 known examples."
        currentBid={8500}
        yourBid={8600}
           img= "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=400&q=80"
        /> */}
        {/* <BidCard />
        <BidCard />
        <BidCard /> */}
        </div>
    </div>
  )
}

export default ActiveBid