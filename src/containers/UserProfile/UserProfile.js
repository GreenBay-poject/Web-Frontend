import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory} from "react-router";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

import { addAlert } from '../../store/actions/index';
import { getUserDetails } from "../../api/auth";
import UserDetails from "../UserProfile/UserDetails"
import backgroundimage from '../UserProfile/images/signuppage.jpg';
import * as routez from '../../shared/routes';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  layout:{
    height: "100%",
    margin: "10px"
  },
  leftcontainer:{
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  rightcontainer:{
    height: "100%"
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    borderRadius: '50%',
    objectFit: 'cover',
    backgroundImage: `url(${backgroundimage})` ,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',

  },

  imagecard:{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

function UserProfile(props) {
  const classes = useStyles();
  const history = useHistory();
  const { isAuthenticated, email } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [ usrDetails, setUsrDetails] =useState([]);

    useEffect(() => {
        if (isLoading ) {
           getUserDetails({email:email})
            .then((response) => {
              if (!response.error) {
                setUsrDetails(response.data.UserDetails)
              }
            })
            .finally(() => setIsLoading(false));
        }
    }, [isLoading, email]);

  if (!isAuthenticated) {
		history.push(routez.SIGNIN)
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.layout}>
        <Grid item xs={12} sm={4} className={classes.leftcontainer} >
          <Paper className={classes.imagecard} elevation={3}>
              <img alt="pp" className={classes.large}/> 
              <Typography variant="h5" gutterBottom>
                {usrDetails.username}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {usrDetails.useremail}
              </Typography>
          </Paper>
          <Paper className={classes.paper} elevation={3}>
              <List component="nav" aria-label="main mailbox folders">
                <ListItem button>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Profile" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Change Passowrd" />
                </ListItem>
              </List>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8} className={classes.rightcontainer}>
              {isAuthenticated ? <UserDetails usrDetails={usrDetails}/> :<UserDetails />}
        </Grid>
      </Grid>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);