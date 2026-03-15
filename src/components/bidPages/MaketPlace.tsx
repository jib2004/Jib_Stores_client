import React from 'react'
import { useGetBidProductsQuery } from '../../api/users/bid'

const MaketPlace = () => {
  const {data,isError,error,isLoading} = useGetBidProductsQuery(undefined)

  if(isError){
    console.log(error)
  }


  console.log(data)
  return (
    <>
    {isLoading ? 
    <h1>Loading...</h1>
    :
    <div>
      MaketPlace
    </div>
  }
    
    </>
  )
}

export default MaketPlace