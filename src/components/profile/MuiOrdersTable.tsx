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
import { FaEye } from 'react-icons/fa';



const MuiOrdersTable = () => {

    const params = useParams();
    const [rows,setRows] = useState<Order[]>([])

    const {data:userOrders,error,isError} = useGetUserOrdersQuery(params.id,{
        skip:!params.id,
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    })

    if(isError){
        console.log(error)
    }

    // console.log(rows)
// function createData(
//   orderId: string,
//   date: number,
//   total: number,
//   status: number,
// ) {
//   return { orderId,date,total,status };
// }

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

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

  return (
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ORDER ID</TableCell>
            <TableCell >DATE</TableCell>
            <TableCell >TOTAL</TableCell>
            <TableCell >STATUS</TableCell>
            <TableCell >ACTION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.orderNumber}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                 {"ORD-" + row?.orderNumber}
              </TableCell>
              <TableCell >{row.created_at.slice(0,10)}</TableCell>
              {row.productDetails?.length > 0 && row.productDetails.map(r=>(
                <>
                <TableCell >{r.basePrice.toLocaleString()}</TableCell>
                <TableCell >{r.orderStatus}</TableCell>
                </>
              ))}
              <TableCell ><Link to={`#`}><FaEye size={20} className=' cursor-pointer'/></Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  )
}

export default MuiOrdersTable