import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useDeleteSellerProductMutation } from '../api/users/seller';
import { useNavigate } from 'react-router';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type dialogueProp = {
    open:boolean
    openFunc?: ()=>void,
    id:string |undefined,
    sellerId:string | undefined,
    isLoading?:boolean
}

export default function AlertDialogSlide({openFunc,open,id,sellerId}:dialogueProp) {
    const [deleteProduct] = useDeleteSellerProductMutation()
    const navigate = useNavigate()
    const [isLoading,setIsloading] = React.useState(false)

    const confirmation = async() =>{
        // navigate(`/seller/product/${sellerId}`)
        setIsloading(true)
        try {
            setIsloading(false)
            const response = await deleteProduct({id,sellerId}).unwrap()
            navigate(`/seller/product/${sellerId}`)
        } catch (error) {
            console.log(error)
            setIsloading(false)
        }finally{
          setTimeout(() => {
            setIsloading(false)
            navigate(`/seller/product/${sellerId}`)
          }, 10000);
        }
    }
  return (
    <React.Fragment>
      <div>
        {isLoading && <div className='w-screen h-screen'>Loading...</div>}
      </div>
      
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={openFunc}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{
            color:'black',
            fontSize:'24px'
          }} id="alert-dialog-slide-description">
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={openFunc} sx={{
            backgroundColor:'red',
            color:'white'
          }}>Cancel</Button>
          <Button onClick={confirmation} sx={{
            backgroundColor:'green',
            color:'white'
          }}>Yes</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
