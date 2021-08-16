import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { addAlert } from '../../store/actions/index';
import { getUserDetails } from "../../api/auth";

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
    const { email } = props;
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

    return (
        <div className={classes.root}>  
            <Card className={classes.card}>
                <CardHeader
                    title="My profile"
                    subheader="GreenBay"
                />
                <CardContent>
                    <form noValidate autoComplete="off">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="Username"
                                    label="User Name"
                                    value={usrDetails.username}
                                    fullWidth
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    type="name"
                                    id="gender"
                                    label="Gender"
                                    fullWidth
                                    value={usrDetails.gender}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="email"
                                    label="Email"
                                    type="name"
                                    fullWidth
                                    value={usrDetails.useremail}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="age"
                                    label="Age"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    value={usrDetails.age}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                    <TextField
                                        margin="address"
                                        id="Address"
                                        label="Adress"
                                        fullWidth
                                        value={usrDetails.address}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="postalcode"
                                    label="Postal Code"
                                    fullWidth
                                    value={usrDetails.postalcode}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
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