import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ImageIcon from '@mui/icons-material/Image';
import IconButton from '@mui/material/IconButton';
import SmsIcon from '@mui/icons-material/Sms';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fDate } from '../../../utils/formatTime';
import config from '../../../utils/config';
import ReplyModal from './ReplyModal';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ReviewCard = ({ review }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [openCommentModal, setOpenCommentModal] = React.useState(false);
  const [selectedComments, setSelectedComments] = React.useState([]);

  const viewComment = (comment) => {
    setOpenCommentModal(true);
    setSelectedComments(comment);
  }


  return (
    <Card sx={{
      height:"100%", 
      backgroundColor:"black", 
      background: "linear-gradient(183deg, rgba(255,0,0,1) 0%, rgb(42 154 0) 0%, #0e3216 100%, #86fd31 100%, #86fd31 100%)",
      // color:"yellow",
      color: "white"
    }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"
            src={review.user?.avatar ? `${config.server}:${config.port}/avatars/${review.user?.avatar}` : `${config.server}:${config.port}/avatars/avatar_default.jpg`}
          />
        }
        sx={{color:"black"}}
        title={review.title}
        subheader={review.user.name}
      />
      <CardContent>
        <Typography variant="body2" color="white">
          {review.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{display:"flex", justifyContent:"space-between"}}>
        <Typography variant="body2" color="white">
          {fDate(review.createdAt)}
        </Typography>
        {review?.reply && <IconButton onClick={() => viewComment(review?.reply)} sx={{padding:0, color:"yellow"}}>
          <SmsIcon sx={{ width: 16, height: 16, mr: 0.5, }} />
        </IconButton>}
        
      </CardActions>

      <ReplyModal open={openCommentModal} reply={review?.reply} handleClose={() => setOpenCommentModal(!openCommentModal)}/>
    </Card>
  );
}

export default ReviewCard;
