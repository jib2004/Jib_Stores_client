import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

type ratingProp ={
    rating: number | undefined
}

export default function HalfRating({rating}:ratingProp) {
  return (
    <Stack spacing={1}>
      <Rating name="half-rating-read" defaultValue={rating || 0} precision={0.5} readOnly />
    </Stack>
  );
}