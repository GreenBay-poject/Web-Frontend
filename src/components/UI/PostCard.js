import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Grid from '@material-ui/core/Grid';
import { toast } from 'react-toastify';

import defaultimages from '../Images/defaultimage.png';
import { deletePost } from "../../api/feed";
import { addAlert } from '../../store/actions/index';
import DeleteModel from "../../containers/Feed/delModal"

const useStyles = makeStyles({
  root: {
    width: "100%",
    margin: "20px"
  },
  media: {
    height: 150,
  },
  description: {
      display: "flex",
      textAlign: "left"
  }
});

function PostCard(props) {
    const classes = useStyles();
    const { keyid, title, image, description, dateposted, ministry, email, setIsLoading, isAuthorized, isAuthenticated} = props;
    const [openDelete, setOpenDelete] = React.useState(false);
    const [selectDelete, setSelectDelete] = React.useState(false);

    const handleOpenDelete = () => {
        setOpenDelete(false);
        handleDelete(selectDelete)
      };
    
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleOpenDeleteModal = (keyid) => {
        setSelectDelete(keyid)
        setOpenDelete(true);
    };

    console.log(isAuthorized)

    const handleDelete = (keyid) => {
        setIsLoading(true)
        let data = {
            "email": email,
            "post_id": keyid
        } 
        console.log(data)
        deletePost(data)
        .then((response) => {
            if (!response.error) {
                toast.success('Post Deleted Successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
            } else {
                toast.error('Error Occured!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
        }).finally(() => setIsLoading(false))
    };

      
    return (
        <React.Fragment>
            <Card className={classes.root}>
                <CardActionArea>
                    <Grid container spacing={3} className={classes.layout}>
                        <Grid item xs={12} sm={4}>
                            <CardMedia
                                className={classes.media}
                                image= {image ? image : defaultimages}
                                title="Contemplative Reptile"
                            />
                            <List className={classes.root}>
                                <ListItem>
                                    <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={ministry} secondary={dateposted} />
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p"  className={classes.description}>
                                    {description}
                                </Typography>
                            </CardContent>
                        </Grid>
                    </Grid>
                </CardActionArea>
                <CardActions>
                    {isAuthorized==true ? 
                        <Button size="small" color="secondary" class="dltbtn" onClick={() => handleOpenDeleteModal(keyid)}>
                            Delete
                        </Button> : null
                    }
                </CardActions>
                </Card>
                <DeleteModel
                    open={openDelete}
                    handleClose={handleCloseDelete}
                    handleDelete={handleOpenDelete}
                />
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token != null,
        isAuthorized: state.auth.IsAuthorized,
        error: state.auth.error,
        email: state.auth.email
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        addAlert: (alert) => dispatch(addAlert(alert))
    }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PostCard);
