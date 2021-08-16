import React, { useState, useCallback }  from 'react';
import { Redirect } from "react-router";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import { Button, FormLabel } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import CssBaseline from '@material-ui/core/CssBaseline';

import { checkValidity } from '../../shared/validate';
import { updateObject } from '../../shared/utility';
import { buildTextFields } from '../../helpers/uiHelpers';
import { authReg } from '../../store/actions/index';
import { addAlert } from '../../store/actions/index';
import * as routez from '../../shared/routes';

import backgroundimage from '../../shared/images/signuppage.jpg';


const inputDefinitions = {
    gmail: {
        label: 'Email*',
        validations: {
            required: true,
            isEmail: true,
            validationErrStr: 'Enter a valid email',
        }
    },
    name: {
        label: 'Name',
        type: 'String',
        validations: {
            required: true,
            minLength: 2,
            maxLength: 40,
            validationErrStr: 'Use between 6 and 40 characters for your password',
        }
    },
    gender: {
      label: 'Gender',
      type: 'String',
      validations: {
          required: true,
          minLength: 2,
          maxLength: 40,
          validationErrStr: 'Use between 6 and 40 characters for your password',
      }
    },
    postalcode: {
      label: 'Postal Code',
      type: 'String',
      validations: {
          required: true,
          minLength: 2,
          maxLength: 40,
          validationErrStr: 'Use between 6 and 40 characters for your password',
      }
    },
    age: {
        label: 'Age',
        type: 'String',
        validations: {
            required: true,
            minLength: 2,
            maxLength: 40,
            validationErrStr: 'Use between 6 and 40 characters for your password',
        }
      },
    address: {
      label: 'Address',
      type: 'String',
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
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        backgroundImage: backgroundimage ,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
        width: '100%'
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
    },
    loginInput: {
        width: '100%',
        marginTop: '20px',
        color: 'white'
    },
}));

function SignIn(props) {
    const classes = useStyles();
    const { isAuthenticated, error } = props;
    let history = useHistory();

    const redirectUrl = "";

    const [inputIsValid, setInputIsValid] = useState({
      gmail: true,
      name: true,
      gender: true,
      age: true,
      postalcode: true,
      address: true,
    });

    const [authObj, setAuthObj] = useState({
      gmail: '',
      name: '',
      gender: '',
      age: '',
      postalcode: '',
      address: '',
    });

    const inputProperties = {
      gmail: {
          styleClass: classes.loginInput
      },
      name: {
          styleClass: classes.loginInput
      },
      gender: {
        styleClass: classes.loginInput
      },
      age: {
        styleClass: classes.loginInput
      },
      postalcode: {
          styleClass: classes.loginInput
      },
      address: {
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
        localInputIsValid['name'] = checkInputValidity('name');
        localInputIsValid['gender'] = checkInputValidity('gender');
        localInputIsValid['age'] = checkInputValidity('age');
        localInputIsValid['postalcode'] = checkInputValidity('postalcode');
        localInputIsValid['address'] = checkInputValidity('address');
        setInputIsValid(localInputIsValid);

        if (localInputIsValid['gmail'] && localInputIsValid['name']) {
            props.onAuth(
                authObj.gmail,
                authObj.name,
                authObj.gender,
                authObj.age,
                authObj.postalcode,
                authObj.address,
            );
        }
    }, [authObj, checkInputValidity, inputIsValid, props]);

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
		if (redirectUrl === "") return <Redirect to={routez.FEED} />;
		return <Redirect to={redirectUrl} />;
    }

  return (
    <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} elevation={6} square>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign Up
            </Typography>
            <form noValidate autoComplete="off" className={classes.form} onSubmit={onSubmitHandler}>
                {formErrorLabel}
                {inputFields}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign Up
                </Button>
                <Grid container>
                    <Grid item xs>
                    <Link href="#" variant="body2">
                        Forgot password?
                    </Link>
                    </Grid>
                    <Grid item>
                    <Link onClick={ ()=> history.push("/signin")} variant="body2">
                        {"Have an account? Sign In"}
                    </Link>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token != null,
        error: state.auth.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (gmail, name, gender, age, postalcode, address) => dispatch(authReg(gmail, name, gender, age, postalcode, address)),
        addAlert: (alert) => dispatch(addAlert(alert))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

