import { useContext } from "react";
import { BidContext } from "../context/BidProvider";


export const useBid=()=>{
    return useContext(BidContext)
}