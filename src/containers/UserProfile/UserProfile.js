import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation} from "react-router";

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
import UserDetails from "../UserProfile/UserDetails";
import Changepassword from "../UserProfile/ChangePassword"
import backgroundimage from '../UserProfile/images/signuppage.jpg';
import * as routez from '../../shared/routes';
import Loader from "../UserProfile/hello"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    marginTop: "10px",
    backgroundColor: "rgb(0, 121, 107)",
    color: "white"
  },
  layout:{
    height: "100%",
    margin: "10px"
  },
  leftcontainerbox:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  rightcontainer:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: "100%",
  },
  large: {
    width: "140px",
    height: "130px",
    borderRadius: '50%',
    objectFit: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
  },

  imagecard:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    backgroundColor: "rgb(0, 121, 107)",
    color: "white"
  },
  button:{
    "&:hover": {
      backgroundColor: "#05574F",
    },
  }
}));

function UserProfile(props) {
  const classes = useStyles();
  const history = useHistory();
  const { isAuthenticated, email } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [ usrDetails, setUsrDetails] =useState([]);
  const { pathname } = useLocation();

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

  if (!isLoading){
    return (
      <div className={classes.root}>
        <Grid container spacing={3} className={classes.layout}>
          <Grid item xs={12} sm={4} className={classes.leftcontainer} >
            <div className={classes.leftcontainerbox}>
              <Paper className={classes.imagecard} elevation={3}>
                  <img alt="pp" className={classes.large} src={backgroundimage}/> 
                  <Typography variant="h5" gutterBottom>
                    {usrDetails.username}
                  </Typography>
                  <Typography variant="h7" gutterBottom>
                    {usrDetails.useremail}
                  </Typography>
              </Paper>
              <Paper className={classes.paper} elevation={3}>
                  <List component="nav" aria-label="main mailbox folders">
                    <ListItem button className={classes.button} onClick={() => history.push(routez.USER_PROFILE)}>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText  primary="My Profile" />
                    </ListItem>
                    <ListItem button onClick={() => history.push(routez.CHANGE_PASSWORD)} title="changepassword">
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Change Password" />
                    </ListItem>
                  </List>
              </Paper>
            </div>
          </Grid>
        {pathname===routez.USER_PROFILE ? (
          <Grid item xs={12} sm={8} className={classes.rightcontainer}>
                {isAuthenticated ? <UserDetails usrDetails={usrDetails}/> :<UserDetails usrDetails={usrDetails}/>}
          </Grid>
         ) : (
          <Grid item xs={12} sm={8} className={classes.rightcontainer}>
              {isAuthenticated ? <Changepassword/> :<Changepassword/>}
          </Grid>
         )}
        </Grid>
      </div>
    );
  }
  return(<Loader/>)
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