import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { useHistory} from "react-router";

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AssessmentIcon from '@material-ui/icons/Assessment';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import VpnLockIcon from '@material-ui/icons/VpnLock';

import { addAlert, authLogout } from '../store/actions/index';
import * as routez from '../shared/routes';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({ 
  root: {
    display: 'flex',  
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    borderBottomLeftRadius: "25%",
    borderBottomRightRadius: "25%",
    backgroundColor: "rgb(0, 121, 107)"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "rgb(0, 121, 107)",
    color: "rgb(250, 250, 250)"
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  title: {
    flexGrow: 1,
  },
}));

function Layout(props) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const { isAuthenticated, onAuthLogout } = props;
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const modalopen = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = () => { 
    setAnchorEl(true);
  };

  const handleClose = () => { 
    setAnchorEl(false);
  };

  const handleLogout = () => {
    setAnchorEl(false);
    onAuthLogout();
    history.push(routez.SIGNIN);
  };

  const loginbutton = () => {
    history.push(routez.SIGNIN);
  };

  const logoutbutton = () => {
    history.push(routez.SIGNUP);
  };

  const handleFeedroute = () => { 
      history.push(routez.FEED) 
  };

  const handleProfileroute = () => { 
    history.push(routez.USER_PROFILE) 
  };

  const handleQAroute = () => { 
      history.push(routez.QUESTIONS) 
  };

  const handleChangePasswordroute = () => { 
    history.push(routez.CHANGE_PASSWORD) 
  };

  const handleLandingroute = () => { 
    history.push(routez.LANDING) 
  };

  const handleDeforestationReportroute = () => { 
    history.push(routez.DEFORESTATIONREPORT) 
  };

  const handleNotesroute = () => { 
    history.push(routez.NOTES) 
  };

  const handleLandReportroute = () => { 
    history.push(routez.LANDREPORT) 
  };

  const handleAboutroute = () => { 
    history.push(routez.ABOUTUS) 
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            title="menubutton"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            GreenBay
          </Typography>
          {isAuthenticated ? (
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                    title="iconbtn"
                    {...bindTrigger(popupState)}
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={modalopen}
                    onClose={handleClose}
                    {...bindMenu(popupState)}
                  >
                    <MenuItem onClick={handleProfileroute}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          ) :
            <div>
              <Button color="inherit" title="loginbtn" onClick={loginbutton}>Login</Button>
              <Button color="inherit" title="registerbuttin" onClick={logoutbutton}>Register</Button>
            </div>
          }
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton title="menuclosebtn" onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem button key={'Home'}>
              <ListItemIcon>{<AccountBalanceIcon/>}</ListItemIcon>
              <ListItemText primary={'Home'} onClick={handleLandingroute}/>
            </ListItem>
            <ListItem button key={'About Us'}>
              <ListItemIcon>{<AccountBalanceIcon/>}</ListItemIcon>
              <ListItemText primary={'About Us'} onClick={handleAboutroute}/>
            </ListItem>
            {isAuthenticated ? (
                <>
                <ListItem button key={'My Profile'} >
                    <ListItemIcon>{<SupervisedUserCircleIcon/>}</ListItemIcon>
                    <ListItemText primary={'My Profile'} onClick={handleProfileroute}/>
                </ListItem>
                <ListItem button key={'Change Password'} onClick={handleChangePasswordroute}>
                    <ListItemIcon>{<VpnLockIcon/>}</ListItemIcon>
                    <ListItemText primary={'Change Password'} />
                </ListItem>
                </>) : null
            }
        </List>
        <Divider />
        <List>
            <ListItem button key={'Land Report'} onClick={handleLandReportroute}>
              <ListItemIcon>{<AssessmentIcon/>}</ListItemIcon>
              <ListItemText primary={'Land Report'} />
            </ListItem>
            <ListItem button key={'Deforestation report'} onClick={handleDeforestationReportroute}>
                <ListItemIcon>{<MenuBookIcon/>}</ListItemIcon>
                <ListItemText primary={'Deforestation report'} />
            </ListItem>
            {isAuthenticated ? 
                <ListItem button key={'Q&A'} disabled={!isAuthenticated}>
                    <ListItemIcon>{<QuestionAnswerIcon/>}</ListItemIcon>
                    <ListItemText primary={'Q & A'} onClick={handleQAroute}/>
                </ListItem> : null        
            }
            <ListItem button key={'Notes'}>
                <ListItemIcon>{<SpeakerNotesIcon/>}</ListItemIcon>
                <ListItemText primary={'Notes'} onClick={handleNotesroute}/>
            </ListItem>
            <ListItem button key={'Feed'}>
                <ListItemIcon>{<DynamicFeedIcon/>}</ListItemIcon>
                <ListItemText primary={'Feed'} onClick={handleFeedroute}/>
            </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
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
        onAuthLogout: () => dispatch(authLogout()),
        addAlert: (alert) => dispatch(addAlert(alert))
    }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Layout);