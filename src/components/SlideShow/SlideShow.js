import React from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import useMediaQuery from "@mui/material/useMediaQuery";


import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';

import config from '../../utils/config';


export default function SlideShow () {


  const dispatch = useDispatch();
  const adminModule = useSelector((state) => state.adminModule);
  const banners = adminModule.banners;

  const imageStyle = {
    borderTopLeftRadius: "18px",
    objectFit: "cover",
    objectPosition: "left",
    minHeight: "100%",
    width: "100%",

  }

  const mobileScreen = useMediaQuery("(max-width:900px)");

  const mdTextStyle = {
    position:"absolute", color:"yellow", left:"2vw", top:"50%", transform: 'translate(0, -50%)', maxWidth:"450px", textAlign:"left",
    textShadow: "3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
    textStroke: "1px black",
  };
  const xsTextStyle = {
    position:"absolute", color:"yellow", top:"50%", transform: 'translate(0, -50%)', width:"100%", textAlign:"left",
    // backgroundColor: "white",
    textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
    textStroke: "1px black",
  };

  const text = [
    (<>
        <h2 style={{margin:"10px"}}>Welcome to Nancy Room where the fun starts!</h2>
        <p style={{fontSize:mobileScreen?"16px":"20px", margin:0}}>-Sign up for Amazing games, incredible promos and wonderful people helping you! <br/>
        -Open 24/7<br/>
        -$10 referral bonus per person referred.<br/>
        Interested? Chat with us today!</p>
    </>),
    (<>
        <p style={{fontSize:mobileScreen?"16px":"22px", margin:0}}>In our website you will be able to create an account with us in any of our platforms, load and take credits out of your account and enjoy of incredible weekly and monthly promos<br/>
        What are you waiting for?<br/>
        Chat with us today</p>
    </>),
    (<>
        <p style={{fontSize:"30px", margin:0}}>More than 1,600 happy customers playing with us!<br/>
        Join us today</p>
    </>)
  ]

  return (
    <>
    <div style={{marginBottom: 20}}>
        <Carousel 
            showArrows={false}
            showStatus={false}
            showThumbs = {false}
            swipeable
            emulateTouch
            infiniteLoop
            autoPlay
            interval={300000}
            style={{minHeight:"240px"}}
        >
            {banners.map((item, index)=>(
                <Box sx={{
                    width:{
                        md: "100%",
                    },
                    height:{
                        xs: "100%",
                    }
                }}>
                    <img 
                        style={imageStyle} 
                        src={`${config.server}:${config.port}/banner/${item.url}`}
                        alt={`slide'+${index}`}
                    />
                    <Box sx={mobileScreen?xsTextStyle:mdTextStyle}>
                        <Box
                            sx={{
                                textAlign:{
                                    md:"left",
                                    xs:"center"
                                },
                                fontSize:{
                                    md:"20px",
                                    xs:"16px",
                                }
                                
                            }}
                        >
                            {/* {text[index]} */}
                        </Box>
                    </Box>
                </Box>
            ))}
            
            {/* <Box sx={{height:"100%"}}>
                <img style={imageStyle} src="/assets/images/slideshow/2.jpg" alt='' />
                <Box sx={{position:"absolute", color:"white", left:"2vw", top:"50%", transform: 'translate(0, -50%)', maxWidth:"450px", textAlign:"left"}}>
                    <h1>Click on chat to ask how to get an user account</h1>
                </Box>
            </Box>
            <Box sx={{height:"100%"}}>
                <img style={imageStyle} src="/assets/images/slideshow/3.jpg" alt='' />
                <Box sx={{position:"absolute", color:"white", left:"2vw", top:"50%", transform: 'translate(0, -50%)', maxWidth:"450px", textAlign:"left"}}>
                    <h1>DISCOVER</h1> <h1 style={{color:"#f4b03e"}}>NEW WINNER</h1>
                </Box>
            </Box>
            <Box sx={{height:"100%"}}>
                <img style={imageStyle} src="/assets/images/slideshow/4.jpg" alt='' />
            </Box>
            <Box sx={{height:"100%"}}>
                <img style={imageStyle} src="/assets/images/slideshow/5.jpg" alt='' />
            </Box> */}
        </Carousel>
        </div>
    </>
  );
}

