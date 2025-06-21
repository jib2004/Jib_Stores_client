import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 1,
    top: 0,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}));

type cartProp={
  id: string | undefined,
  cart: number | undefined
}


export default function Cart({cart,id}:cartProp) {
  return (
    <Link to={`/user/cart/${id}`}>
    <IconButton aria-label="cart"  className='size-6'>
      <StyledBadge badgeContent={cart} color={'error'} overlap="circular">
        <ShoppingCartIcon sx={{color:"black",width:35,height:35}}/>
      </StyledBadge>
    </IconButton>
    </Link>
  );
}