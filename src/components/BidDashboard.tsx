import {useEffect} from 'react'
import Bids from './bidPages/Bids'
import Listings from './bidPages/Listings'
import MaketPlace from './bidPages/MaketPlace'
import Settings from './bidPages/Settings'
import Watchlist from './bidPages/Watchlist'
import { useBid } from '../hooks/useBid'

const BidDashboard = () => {
    const {page} = useBid()
    useEffect(()=>{},[page])

  return (
    <>
        {page === 'market_place' && <MaketPlace/> }
        {page === 'bids' && <Bids/> }
        {page === 'watchlist' && <Watchlist/>}
        {page === 'settings' && <Settings/> }
        {page === 'listings' && <Listings/> }
    </>
  )
}

export default BidDashboard