
import { Grid } from '@mui/material';
import ReviewCard from './ReviewCard';

// ----------------------------------------------------------------------

export default function ProductList({ reviews, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {reviews.map((review) => (
        <Grid key={review._id} item xs={12} sm={6} md={4}>
          <ReviewCard review={review} />
        </Grid>
      ))}
    </Grid>
  );
}
