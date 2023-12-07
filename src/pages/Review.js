import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
// @mui
import { Container, Typography, Grid, Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
// components
import { ReviewList } from '../sections/@dashboard/reviews';
import { onShowAlert, openLoginOrSignupModal } from '../redux/user/actions';
// mock
import PRODUCTS from '../_mock/products';
// actions
import { onSendReview, getReview } from '../redux/review/actions';
// ----------------------------------------------------------------------

const ReviewPage = ({
  openLoginOrSignupModal,
  isLogin,
  onReview,
  getReview,
  reviews
}) => {

  const dispatch = useDispatch();
  const [review, setReview] = useState({
    title: '',
    content: ''
  })
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [redAlert, setRedAlert] = useState(false);

  const handleNewReview = () => {
    if (!isLogin)
      openLoginOrSignupModal('login');
    else if (review.title.length > 0 && review.content.length > 0) {
      setLoading(true);
      onReview(review, res => {
        if (res.success) {
          setReview({
            title: '',
            content: ''
          });

          dispatch(onShowAlert("your review will be checked and posted. Thank you ", true));
        }
        setTimeout(setLoading(false), 3000)
      });
      
    }
  }
  const onChangeInput = e => {
    if(e.target.value.length <= 200) {
      setReview({
        ...review,
        [e.target.name]: e.target.value
      })
      setRedAlert(false);
    } else {
      setRedAlert(true);
    }
    
  }
  const onLoadMoreHandler = () => {
    // if (!isLogin)
    //   openLoginOrSignupModal('login');
    // else {
      getReviewHandler(page + 1);
    // }
  }
  const getReviewHandler = page => {
    setLoading(true);
    getReview(page, res => {
      setLoading(false);
    });
    setPage(page);
  }

  useEffect(() => {
    getReviewHandler(page)
  }, [])
  return (
    <>
      <Helmet>
        <title> Reviews | Nancy Room </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Reviews
        </Typography>

        <ReviewList reviews={reviews} />

        <Grid container style={{ marginTop: 30, justifyContent: 'center', display: 'flex' }}>
          <Button sx={{backgroundColor:"#32af0f"}} variant="contained"  color="success" onClick={onLoadMoreHandler}>Load more</Button>
        </Grid>
        <Grid container style={{ marginTop: 40, paddingLeft: 30, paddingRight: 30 }}>
          <Grid item xs={12} md={12} style={{ justifyContent: 'center', display: 'flex' }}>
            <Typography fontSize={30}>Leave a review</Typography>
          </Grid>
          <Grid item xs={12} md={12} style={{ justifyContent: 'center', display: 'flex' }}>
            <Typography fontSize={20}>please write a few words describing your experience with us , thank you!</Typography>
          </Grid>
          <Grid item xs={12} md={12} style={{ justifyContent: 'center', display: 'flex' }}>
            <Grid container style={{ marginTop: 30 }}>
              <Grid item md={3} />
              <Grid item md={6} xs={12} sm={12}>
                <TextField name="title" style={{ width: '100%' }} placeholder="Title" value={review.title} onChange={onChangeInput} />
                <TextField name="content" style={{ width: '100%', marginTop: 20 }} value={review.content} onChange={onChangeInput} multiline rows={5} placeholder="content" />
                <Typography variant="body2" color="text.secondary" sx={{color:redAlert?"red":"white", textAlign:"right"}}>
                    Max 200 Characters
                </Typography>
                <Grid container style={{ marginTop: 10 }}>
                  <Grid item md={4} xs={4} sm={4} />
                  <Grid item md={4} xs={4} sm={4}>
                    <LoadingButton endIcon={<SendIcon />} disabled={loading} loadingPosition="end" loading={loading} onClick={handleNewReview} sx={{backgroundColor:"#32af0f"}} variant="contained" color="success">Send</LoadingButton>
                  </Grid>
                  <Grid item md={4} xs={4} sm={4} />
                </Grid>
              </Grid>
              <Grid item md={3} />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

const mapStateToProps = ({ userModule, reviewModule }) => ({
  isLogin: userModule.userData.auth,
  reviews: reviewModule.reviews
})

const mapDispatchToProps = (dispatch) => ({
  openLoginOrSignupModal: (type) => dispatch(openLoginOrSignupModal(type)),
  onReview: (data, cb) => dispatch(onSendReview(data, cb)),
  getReview: (page, cb) => dispatch(getReview(page, cb))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReviewPage);