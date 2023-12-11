import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
// @mui
import { Grid, Container, Stack, Typography, Button } from '@mui/material';
// components
import { PromoCard } from '../sections/@dashboard/promo';
import { getPromos } from '../redux/promo/actions';
import { openLoginOrSignupModal } from '../redux/user/actions';

// ----------------------------------------------------------------------

const PromotionPage = ({
  getPromos,
  promos
}) => {

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const loadMoreHandle = () => {
    // if (!isLogin)
    //   openLoginOrSignupModal('login');
    // else {
    getPromosHandler(page + 1);
    // }
  }
  const getPromosHandler = page => {
    setLoading(true);
    getPromos(page, () => {
      setLoading(false);
    })
    setPage(page);
  }
  useEffect(() => {
    getPromosHandler(page)
  }, [])

  return (
    <>
      <Helmet>
        <title> Promotions | Nancy Room </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Promotions
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {promos.map((promo, index) => (
            <PromoCard key={promo.id} promo={promo} index={index} />
          ))}
        </Grid>
        <Grid container style={{ marginTop: 30, justifyContent: 'center', display: 'flex' }}>
          <Button sx={{ backgroundColor: "#32af0f" }} variant="contained" color="success" onClick={loadMoreHandle}>Load more</Button>
        </Grid>
      </Container>
    </>
  );
}
const mapStateToProps = ({ userModule, promoModule }) => ({
  isLogin: userModule.userData.auth,
  promos: promoModule.promos,
})

const mapDispatchToProps = (dispatch) => ({
  openLoginOrSignupModal: (type) => dispatch(openLoginOrSignupModal(type)),
  getPromos: (page, cb) => dispatch(getPromos(page, cb))
})

export default connect(mapStateToProps, mapDispatchToProps)(PromotionPage)