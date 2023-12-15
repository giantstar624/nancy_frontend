import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardHeader } from '@mui/material';
import config from '../../../utils/config';
import { fDate } from '../../../utils/formatTime';
import ShowImgCard from './ShowImgCard';

const PromoCard = ({ promo }) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(!open);
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card sx={{
                background: "linear-gradient(183deg, rgba(255,0,0,1) 0%, rgb(42 154 0) 0%, #0e3216 100%, #86fd31 100%, #86fd31 100%)",
            }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={`${config.server}:${config.port}/promoImg/${promo?.image}`}
                    alt="green iguana"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setOpen(!open)}
                />
                <CardContent>
                    <Typography variant="body2" fontSize={18} color="yellow">
                        {promo.content}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Typography fontSize={15} color="text.disabled">
                        {fDate(promo.createdAt)}
                    </Typography>
                </CardActions>
                {promo.showTag ? <img
                    src="/assets/new1.png"
                    alt='new brand'
                    style={{
                        position: "absolute",
                        right: "0px",
                        top: "0px",
                    }}
                /> : <></>}

            </Card>
            <ShowImgCard open={open} handleClose={handleClose} url={`${config.server}:${config.port}/promoImg/${promo?.image}`} />
        </Grid >
    );
}

export default PromoCard;