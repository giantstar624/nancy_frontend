import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Container, Button } from '@mui/material';

// SlideShow
import SlideShow from '../components/SlideShow/SlideShow';
import GameItem from '../components/game';
import { onShowAlert } from '../redux/user/actions';




// ----------------------------------------------------------------------

const DashboardAppPage = ({confirmed}) => {

  const adminModule = useSelector((state) => state.adminModule);
  const games = adminModule.games;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    if(confirmed){
      dispatch(onShowAlert("Account has been confirmed, now you can login", true));
      navigate("/");
    }
  }, []);

  return (
    <>
      <Helmet>
        <title> Home | Nancy Room </title>
      </Helmet>
      <Container maxWidth="xl">

        <SlideShow />

        <h2 style={{color:"#32af0f"}}>Our Games</h2>
        <Grid container spacing={3}>
          {
            games.map((game, i) => <GameItem data={game} key={i} />)
          }
        </Grid>
        
      </Container>
    </>
  );
}

export default DashboardAppPage;