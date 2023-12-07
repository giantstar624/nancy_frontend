import { useEffect, useState, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';
// @mui
import {
  Stack,
  Button,
  Container,
  Typography,
  Grid
} from '@mui/material';
// components

import Iconify from '../components/iconify';
// sections
import { BlogPostCard } from '../sections/@dashboard/blog';
import { openLoginOrSignupModal } from '../redux/user/actions';
import { openNewPostModal, getPostDatas, openReplyModal } from '../redux/post/actions';
import PostModal from '../components/post';
import ReplyModal from '../components/post-reply';

// ----------------------------------------------------------------------

const Posts = ({
  isLogin,
  openLoginOrSignupModal,
  openNewPostModal,
  open,
  replyOpen,
  getPosts,
  posts,
  openReplyModal
}) => {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleAddPost = () => {
    if (!isLogin)
      openLoginOrSignupModal('login');
    else {
      openNewPostModal()
    }
  }
  const getPostData = (page) => {
    getPosts(page);
    setPage(page);
  }
  const loadMoreHandle = () => {
    if (!isLogin)
      openLoginOrSignupModal('login');
    else
      getPostData(page + 1);
  }
  useEffect(() => {
    getPostData(page);
  }, []);

  return (
    <>
      <Helmet>
        <title> Posts | Nancy Room </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Posts
          </Typography>
          <Button sx={{backgroundColor:"#32af0f"}} variant="contained" onClick={handleAddPost} color="success" startIcon={<Iconify icon="eva:plus-fill" />}>
            Add Post
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {posts.map((post, index) => (
            <BlogPostCard key={post._id} post={post} comment={post.comment} index={index} />
          ))}
        </Grid>
        <Grid container style={{ marginTop: 30, justifyContent: 'center', display: 'flex' }}>
          <Button sx={{backgroundColor:"#32af0f"}} variant="contained"  color="success" onClick={loadMoreHandle}>Load more</Button>
        </Grid>
        <PostModal open={open} handleClose={openNewPostModal} />
        <ReplyModal open={replyOpen} handleClose={openReplyModal} />
      </Container>
    </>
  );
}

const mapStateToProps = ({ userModule, postModule }) => ({
  isLogin: userModule.userData.auth,
  open: postModule.open,
  posts: postModule.posts,
  replyOpen: postModule.reply_open,
})

const mapDispatchToProps = (dispatch) => ({
  openLoginOrSignupModal: (type) => dispatch(openLoginOrSignupModal(type)),
  openNewPostModal: () => dispatch(openNewPostModal()),
  getPosts: (page) => dispatch(getPostDatas(page)),
  openReplyModal: () => dispatch(openReplyModal()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
