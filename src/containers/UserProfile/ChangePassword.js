import React, { useState, useCallback }  from 'react';
import { connect } from 'react-redux';

import { Button, FormLabel } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';

import { checkValidity } from '../../shared/validate';
import { updateObject } from '../../shared/utility';
import { buildTextFields } from '../../helpers/uiHelpers';
import { auth } from '../../store/actions/index';
import { addAlert } from '../../store/actions/index';
import {changepassword} from "../../api/auth"


const inputDefinitions = {
    newpassword: {
        label: 'New Password*',
        type: 'newpassword',
        validations: {
            required: true,
            minLength: 2,
            maxLength: 40,
            validationErrStr: 'Use between 6 and 40 characters for your password',
        }
    },
    confirmpassword: {
        label: 'Confirm Password*',
        type: 'confirmpassword',
        validations: {
            required: true,
            minLength: 2,
            maxLength: 40,
            validationErrStr: 'Use between 6 and 40 characters for your password',
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
        color: "white",
        "&:hover": {
            backgroundColor: "#05574F",
            transform: "scale(1.01)",
          },
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

function Changepassword(props) {
    const classes = useStyles();
    const { error, email} = props;

    const [inputIsValid, setInputIsValid] = useState({
        newpassword: true,
        confirmpassword: true
    });

    const [authObj, setAuthObj] = useState({
        newpassword: '',
        confirmpassword: ''
    });

    const inputProperties = {
        newpassword: {
            styleClass: classes.loginInput
        },
        confirmpassword: {
            styleClass: classes.loginInput
        }
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
        localInputIsValid['newpassword'] = checkInputValidity('newpassword');
        localInputIsValid['confirmpassword'] = checkInputValidity('confirmpassword');
        setInputIsValid(localInputIsValid);

        let data={email:email, new_password:authObj.newpassword}
        console.log(data)

        if (authObj.newpassword === authObj.confirmpassword) {
            changepassword(data)
                .then((response) => {
                    if (!response.error) {
                        toast.success('Passwords Changed!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                        addAlert("Passwords Changed!")
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
                    }
                })
        } else {
            toast.error('Passwords Mismatch!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            addAlert("Passwords Mismatch!")
        }
    }, [authObj, checkInputValidity, inputIsValid, email]);

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

  return (
    <div className={classes.root}>
        <div>
            <Typography component="h1" variant="h5">
                Change Password
            </Typography>
            <form noValidate autoComplete="off" className={classes.form} onSubmit={onSubmitHandler}>
                {formErrorLabel}
                {inputFields}
                <Button
                    type="submit"
                    variant="contained"
                    titile="changepasswordbtn"
                    className={classes.submit}
                >
                    Change Password
                </Button>
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
        onAuth: (gmail, password) => dispatch(auth(gmail, password)),
        addAlert: (alert) => dispatch(addAlert(alert))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Changepassword);