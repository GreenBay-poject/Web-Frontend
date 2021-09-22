import React from "react";
import { connect } from 'react-redux';

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { green } from '@material-ui/core/colors';
import {
    alpha,
    withStyles,
  } from '@material-ui/core/styles';
  import InputBase from '@material-ui/core/InputBase';

import { addAlert } from '../../store/actions/index';

const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      border: '1px solid #ced4da',
      fontSize: 16,
      width: 'auto',
      padding: '10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.green,
      },
    },
  }))(InputBase);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    card:{
        width: '100%'
    },
}));

const UserProfile = props =>  {
    const classes = useStyles();
    const { usrDetails } = props;

    return (
        <div className={classes.root}>  
            <Card className={classes.card} elevation={3}>
                <CardHeader
                    title="My profile"
                    subheader="GreenBay"
                />
                <CardContent>
                    <form noValidate autoComplete="off">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.margin}>
                                        <InputLabel shrink htmlFor="bootstrap-input">
                                            User Name
                                        </InputLabel>
                                        <BootstrapInput defaultValue="Username" value={usrDetails.username} id="Username" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.margin}>
                                        <InputLabel shrink htmlFor="bootstrap-input">
                                            Gender
                                        </InputLabel>
                                        <BootstrapInput defaultValue="Gender" value={usrDetails.gender} id="gender" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.margin}>
                                        <InputLabel shrink htmlFor="bootstrap-input">
                                            Email
                                        </InputLabel>
                                        <BootstrapInput defaultValue="Email" value={usrDetails.useremail} id="email" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.margin}>
                                        <InputLabel shrink htmlFor="bootstrap-input">
                                            Age
                                        </InputLabel>
                                        <BootstrapInput defaultValue="Age" value={usrDetails.age} id="age" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.margin}>
                                        <InputLabel shrink htmlFor="bootstrap-input">
                                        Adress
                                        </InputLabel>
                                        <BootstrapInput defaultValue="Adress" value={usrDetails.address} id="address" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.margin}>
                                        <InputLabel shrink htmlFor="bootstrap-input">
                                        Postal Code
                                        </InputLabel>
                                        <BootstrapInput defaultValue="Postal Code" value={usrDetails.postalcode} id="postalcode" />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

const mapStateToProps = (state) => {
  return {
      error: state.auth.error,
      isAuthenticated: state.auth.token != null,
      email: state.auth.email
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addAlert: (alert) => dispatch(addAlert(alert))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);