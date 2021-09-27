import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import 'react-quill/dist/quill.snow.css';
import Skeleton from '@material-ui/lab/Skeleton';

import PostCard from '../../components/UI/PostCard';
import Modal from "../Feed/Modal";
import { getPosts } from "../../api/feed";
import { addAlert } from '../../store/actions/index';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
        marginLeft: theme.spacing(8),
        marginRight: theme.spacing(8),
        marginBottom: theme.spacing(8),
    },
    container: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    pagination: {
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
        display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
    },
    button: {
        margin: theme.spacing(8),
    },
    buttonalign: {
        alignItems: 'right',
    },
    skeltonbody: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      paddingBottom:"30px"
    },
}));

function FeedPage(props) {
  const classes = useStyles();
  const { isAuthenticated } = props;
  const [page, setPage] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [postslist, setPosts] =useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (isLoading ) {
        getPosts()
        .then((response) => {
            //console.log(response.data.ALL_POSTS)
          if (!response.error) {
            setPosts(response.data.ALL_POSTS)
          }
        })
        .finally(() => setIsLoading(false));
    }
}, [isLoading]);

  return (
      <React.Fragment>
          <div className={classes.root}>
            <Grid container spacing={3} className={classes.container}>
                <Grid container spacing={3} className={classes.buttonalign}>
                    <Grid item xs>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<CloudUploadIcon />}
                            onClick={handleOpen}
                            hidden={!isAuthenticated}
                        >
                            Upload New Post
                        </Button>
                    </Grid>
                </Grid>
                <div>
                    {postslist ? 
                        postslist.map((author) => 
                          author.posts.map((post) => 
                            <PostCard
                                key={post.post_id}
                                title={post.Title}
                                image={post.Image}
                                description={post.Description}
                                dateposted={post.DatePosted}
                                ministry={author.ministry_name}
                            />
                          )
                        )
                        : null
                    }
                </div>
            </Grid>
          </div>
          <Grid container className={classes.skeltonbody}>
            <Grid item xs={12} sm={12}>
              <Skeleton variant="circle" width={30} height={30} />
              <Skeleton variant="rect" width={1000} height={50} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Skeleton variant="circle" width={30} height={30} />
              <Skeleton variant="rect" width={1000} height={50} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Skeleton variant="circle" width={30} height={30} />
              <Skeleton variant="rect" width={1000} height={50} />
            </Grid>
          </Grid>

        <div className={classes.pagination}>
            <Typography>Page: {page}</Typography>
            <Pagination count={10} page={page} onChange={handleChange} />
        </div>
        <Modal
          open={open}
          handleClose={handleClose}
        />

      </React.Fragment>
  );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token != null,
        error: state.auth.error,
        email: state.auth.email
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        addAlert: (alert) => dispatch(addAlert(alert))
    }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
