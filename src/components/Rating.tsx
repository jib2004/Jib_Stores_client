
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

type ratingProp ={
    rating: number
}

export default function HalfRating({rating}:ratingProp) {
  return (
    <Stack spacing={1}>
      <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />
    </Stack>
  );
}