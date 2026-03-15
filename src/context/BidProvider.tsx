import { createContext, useState,Dispatch, SetStateAction } from "react";
import { appProps } from "../types";

type PageType = 'bids' | 'market_place' | 'watchlist' | 'settings' | 'listings';

interface BidContextType {
  page: PageType;
  setPage: Dispatch<SetStateAction<PageType>>;
}


export const BidContext = createContext<BidContextType>({
    page:'bids',
    setPage:()=> {}
})




export const BidProvider = ({children}:appProps) => {
    const [page, setPage] = useState<PageType>('bids')
  return (
    <BidContext.Provider value={{page,setPage}}>{
        children
    }</BidContext.Provider>
  )
}

