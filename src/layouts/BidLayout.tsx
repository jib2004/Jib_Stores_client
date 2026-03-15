import React from 'react'
import { appProps } from '../types'
import BidNav from '../components/BidNav'
import { BidProvider } from '../context/BidProvider'

const BidLayout = ({children}:appProps) => {
  return (
    <BidProvider>
        <BidNav/>
        {children}
    </BidProvider>
  )
}

export default BidLayout