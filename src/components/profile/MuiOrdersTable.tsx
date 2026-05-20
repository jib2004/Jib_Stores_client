import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams, Link } from 'react-router';
import { useGetUserOrdersQuery } from '../../api/users/buyer';
import { useEffect, useState } from 'react';
import { Order } from '../../types';
import { FaEye,FaArrowLeft, FaArrowRight } from 'react-icons/fa';



type muiOrdersTableProp = {
  page:number,
  limit:number,
  setPage?:React.Dispatch<React.SetStateAction<number>>,
  showPagination:boolean
}

const MuiOrdersTable = ({page,limit,setPage,showPagination}:muiOrdersTableProp) => {

    const params = useParams();

    const [rows,setRows] = useState<Order[]>([])

    const {data:userOrders,error,isError,isLoading} = useGetUserOrdersQuery({id:params.id,page,limit},{
        skip:!params.id,
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    })


    if(isError){
        console.log(error)
    }

useEffect(()=>{
    if(userOrders?.message === "Successful" ){
        setRows(prev =>([
            ...prev,
            ...userOrders.data
        ]))
    }
    return () => {
        setRows([]) // ✅ cleanup on unmount -> if i leave this page it clears the array
    }
},[userOrders])



  return (
    <>
    {isLoading && <div>loading....</div>}
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ORDER ID</TableCell>
            <TableCell >DATE</TableCell>
            <TableCell >TOTAL</TableCell>
            <TableCell>PRICE</TableCell>
            <TableCell>QUANTITY</TableCell>
            <TableCell >STATUS</TableCell>
            
            <TableCell >ACTION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
  {rows.map((row) => (
    <>
      {row.productDetails?.map((r, index) => (
        <TableRow
          key={`${row.orderNumber}-${index}`}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          {/* Only show ORDER ID and DATE on the first product row */}
          <TableCell component="th" scope="row">
            {index === 0 ? "ORD-" + row?.orderNumber : ""}
          </TableCell>
          <TableCell>{index === 0 ? row.created_at.slice(0, 10) : ""}</TableCell>
          <TableCell>{(r.basePrice * r.quantity).toLocaleString()}</TableCell>
          <TableCell>{r.basePrice.toLocaleString()}</TableCell>
          <TableCell>{r.quantity}</TableCell>
          <TableCell>{r.orderStatus}</TableCell>
          <TableCell>
            {index === 0 && ( // only show action on first row
              <Link to={`#`}><FaEye size={20} className='cursor-pointer' /></Link>
            )}
          </TableCell>
        </TableRow>
      ))}
    </>
  ))}
</TableBody>
    </Table>
    </TableContainer>
    {
      showPagination &&
  <div className='flex items-center justify-center gap-4'>

<p className='text-xl font-semibold'>Page(s) :{page} - {userOrders?.totalPages}</p>

        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="w-[64px] bg-white border aspect-square flex items-center justify-center cursor-pointer"><FaArrowLeft size={20}/></button>
        <div className="w-[64px] bg-white rounded-2xl border aspect-square flex items-center justify-center text-xl font-semibold">{page}</div>
        <button disabled={page === userOrders?.totalPages} onClick={() => setPage(page + 1)} className="w-[64px] bg-white border aspect-square flex items-center justify-center cursor-pointer"><FaArrowRight size={20}/></button>

        <p className='text-xl font-semibold'>Total Orders: {userOrders?.totalOrder}</p>
      </div>
      }
    </>

  )
}

export default MuiOrdersTable