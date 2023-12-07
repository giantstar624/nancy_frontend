import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent, IconButton } from '@mui/material';
import SmsIcon from '@mui/icons-material/Sms';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify';
import config from '../../../utils/config';
import { setSelectPost, openReplyModal } from '../../../redux/post/actions';
import { openLoginOrSignupModal } from '../../../redux/user/actions';
import CommentListModal from './CommentListModal';

// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: "yellow",
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

const BlogPostCard = ({
  post,
  index,
  openLoginOrSignupModal,
  openReplyModal,
  setSelectPost,
  isLogin,
}) => {
  const { content, user, createdAt, image, _id, comment } = post;
  const [postId, setPostId] = useState('');
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [selectedComments, setSelectedComments] = useState([]);
  const onReplyHandle = id => {
    if (!isLogin)
      openLoginOrSignupModal('login')
    else {
      setPostId(id);
      setSelectPost({_id: id, comment})
      openReplyModal()
    }
  }
  const viewComment = (comment) => {
    setOpenCommentModal(true);
    setSelectedComments(comment);
  }

  return (
    <Grid item xs={12} sm={4} md={4}>
      <Card sx={{ 
        position: 'relative', 
        height:"100%", 
        // backgroundColor:"black", 
        background: "linear-gradient(183deg, rgba(255,0,0,1) 0%, rgb(42 154 0) 0%, #0e3216 100%, #86fd31 100%, #86fd31 100%)",
        color:"yellow"
      }}>
        <StyledCardMedia>
          <SvgColor
            color="#1a5e0d"
            src="/assets/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',

            }}
          />
          <StyledAvatar
            alt={user?.name}
            src={user?.avatar ? `${config.server}:${config.port}/avatars/${user?.avatar}` : `${config.server}:${config.port}/avatars/avatar_default.jpg`}
          />

          <StyledCover alt={content} src={`${config.server}:${config.port}/postImg/${image}`} />
        </StyledCardMedia>

        <CardContent
          sx={{
            pt: 4,
          }}
        >
          <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
            {fDate(createdAt)}
          </Typography>

          <StyledTitle
            color="yellow"
            variant="subtitle2"
            underline="hover"
          >
            {content}
          </StyledTitle>

          <StyledInfo
            sx={{
              display: 'flow-root',
              color:"yellow"
            }}
          >
            <Box
              sx={{
                display: 'flex',
                float: 'left',
              }}
            >
              <div style={{ float: 'left'}}>
                <IconButton sx={{color:"white"}} onClick={() => onReplyHandle(_id)}><Iconify icon="eva:plus-fill" /></IconButton>
              </div>
            </Box>
            <Box
              key={index}
              sx={{
                alignItems: 'center',
                float: 'right',
                ml: index === 0 ? 0 : 1.5,
                justifyContent: 'center',
                display: 'flex',
                marginTop: 1
              }}
            >
              <IconButton sx={{color:"white"}} onClick={() => viewComment(comment)}><SmsIcon sx={{ width: 16, height: 16, mr: 0.5, }} /></IconButton>
              <Typography variant="caption">{fShortenNumber(comment.length)}</Typography>
            </Box>
          </StyledInfo>
        </CardContent>
      </Card>
      <CommentListModal open={openCommentModal} comments={selectedComments} handleClose={() => setOpenCommentModal(!openCommentModal)}/>
    </Grid>
  );
}

const mapStateToProps = ({ postModule, userModule }) => ({
  replyPost: postModule.replyPpost,
  isLogin: userModule.userData.auth,
})

const mapDispatchToProps = (dispatch) => ({
  openLoginOrSignupModal: (type) => dispatch(openLoginOrSignupModal(type)),
  setSelectPost: (data) => dispatch(setSelectPost((data))),
  openReplyModal: () => dispatch(openReplyModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostCard);
