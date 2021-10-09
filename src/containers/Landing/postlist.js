import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Parallax } from 'react-scroll-parallax';

import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import { getPosts } from "../../api/feed";
import { addAlert } from '../../store/actions/index';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

function SingleLineImageList() {
  const classes = useStyles();
  const [postslist, setPosts] =useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading ) {
        getPosts()
        .then((response) => {
          if (!response.error) {
            setPosts(response.data.ALL_POSTS)
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [isLoading]);

  return (
    <div className={classes.root}>
      <ImageList className={classes.imageList} cols={2.5}>
        {postslist.map((author) => (
         author.posts.map((item) => (
          <ImageListItem key={item.Image}>
            <img src={item.Image} alt={item.Title} />
            <ImageListItemBar
              title={item.Title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton aria-label={`star ${item.Title}`}>
                  <StarBorderIcon className={classes.title} />
                </IconButton>
              }
            />
          </ImageListItem>
        ))))}
      </ImageList>
    </div>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(SingleLineImageList);