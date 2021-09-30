import React, { useState, useCallback }  from 'react';
import { Redirect } from "react-router";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import { Button, FormLabel } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { toast } from 'react-toastify';

import { checkValidity } from '../../shared/validate';
import { updateObject } from '../../shared/utility';
import { buildTextFields } from '../../helpers/uiHelpers';
import { forgetPassword } from "../../api/auth"
import { addAlert } from '../../store/actions/index';
import * as routez from '../../shared/routes';


const inputDefinitions = {
    gmail: {
        label: 'Email*',
        type: "email",
        validations: {
            required: true,
            isEmail: true,
            validationErrStr: 'Enter a valid email',
        }
    }
};

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '45%'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        width: '60%',
        backgroundColor: "rgb(0, 121, 107)",
        color: "white"
    },
    loginInput: {
        width: '80%',
        marginTop: '20px',
        color: 'white',
    },
    links: {
        color: 'rgb(0, 121, 107)',
    }
}));

function ForgetPassword(props) {
    const classes = useStyles();
    const { isAuthenticated, error } = props;
    let history = useHistory();

    const redirectUrl = "";

    const [inputIsValid, setInputIsValid] = useState({
        gmail: true
    });

    const [authObj, setAuthObj] = useState({
        gmail: ''
    });

    const inputProperties = {
        gmail: {
            styleClass: classes.loginInput
        },
    };

    const checkInputValidity = useCallback((inputId, newValue) => {
        let isValid = true;
        let validationConst = inputDefinitions[inputId].validations;
        isValid = checkValidity(validationConst, newValue ? newValue : authObj[inputId])

        return isValid;
    }, [authObj])

    const inputChangeHandler = useCallback((event, inputId) => {
        let validationConst = inputDefinitions[inputId].validations;
        let isValid = checkValidity(validationConst, event.target.value);
        setInputIsValid(updateObject(inputIsValid, { [inputId]: isValid }));
        setAuthObj(updateObject(authObj, { [inputId]: event.target.value }))
    }, [authObj, inputIsValid]);

    let inputFields = buildTextFields(inputDefinitions, inputProperties, inputChangeHandler, inputIsValid);

    const onSubmitHandler = useCallback((event) => {
        event.preventDefault()

        let localInputIsValid = { ...inputIsValid };
        localInputIsValid['gmail'] = checkInputValidity('gmail');
        setInputIsValid(localInputIsValid);

        if (localInputIsValid['gmail']) {
            forgetPassword({email: authObj.email})
                .then((response) => {
                    if (!response.error) {
                        addAlert("Email Sent!")
                    } else{
                        toast.error('Error Occured!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            });
                        addAlert("Error Occured!")
                    }
                })
        } else {
            toast.error('Invalid Email!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            addAlert("Invalid Email!")
        }
    }, [authObj, checkInputValidity, inputIsValid]);

    let formErrorLabel = null;
    if (error) {
        formErrorLabel = (
            <div>
                <FormLabel error={true}>
                    {(error)}
                </FormLabel>
            </div>
        );
    }

    if (isAuthenticated) {
		if (redirectUrl === "") return <Redirect to={routez.LANDING} />;
		return <Redirect to={redirectUrl} />;
    }

  return (
    <div className={classes.root}>
        <div>
            <img src="/Logo96.png" alt="logo"/>
            <Typography component="h1" variant="h5">
                Forget Password
            </Typography>
            <form noValidate autoComplete="off" className={classes.form} onSubmit={onSubmitHandler}>
                {formErrorLabel}
                {inputFields}
                <Button
                    type="submit"
                    variant="contained"
                    className={classes.submit}
                >
                    Verify Email
                </Button>
                <Grid container>
                <Grid item xs={12}>
                    <Link onClick={ ()=> history.push(routez.SIGNIN)} variant="body2" title="change-to-register" className={classes.links}>
                    {"Have an account? Sign In"}
                    </Link>
                </Grid>
                </Grid>
            </form>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);