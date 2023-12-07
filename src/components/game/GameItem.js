import React from 'react';
import { IconButton } from '@mui/material';
import { GameGrid } from './GameItemStyle';
import './style.css';
import config from '../../utils/config';

function GameItem({ data }) {
    
    return (
        <>
            <GameGrid item xs={6} sm={4} md={2.4}>
                <div className="container-image">
                    <img src={`${config.server}:${config.port}/games/${data.image}`} alt={data.name} className="image" style={{borderRadius: 20 }} />
                    <div className="title" style={{width: '100%'}}>
                        {data.title}
                    </div>
                    <IconButton className="middle">
                        <a href={data.url}>
                            <img src="/assets/images/play.svg" alt="Avatar" className='text' style={{ width: "100%" }} />
                        </a>
                    </IconButton>
                </div>
            </GameGrid>
        </>
    );
}

export default GameItem;