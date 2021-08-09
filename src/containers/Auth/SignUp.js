import React, { useState, useCallback, useEffect}  from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

import { checkValidity } from '../../shared/validate';
import { updateObject } from '../../shared/utility';
import { buildTextFields } from '../../helpers/uiHelpers';
import { authReg } from '../../store/actions/index';
import { addAlert } from '../../store/actions/index';
import * as routez from '../../shared/routes';


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
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
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
    let history = useHistory();

    const [inputIsValid, setInputIsValid] = useState({
      gmail: true,
      name: true,
      gender: true,
      postalcode: true,
      address: true,
    });

    const [authObj, setAuthObj] = useState({
      gmail: '',
      name: '',
      gender: '',
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
        localInputIsValid['postalcode'] = checkInputValidity('postalcode');
        localInputIsValid['address'] = checkInputValidity('address');
        setInputIsValid(localInputIsValid);

        if (localInputIsValid['gmail'] && localInputIsValid['name']) {
            props.onAuth(
                authObj.gmail,
                authObj.name,
                authObj.gender,
                authObj.postalcode,
                authObj.address,
            );
        }
    }, [authObj, checkInputValidity, inputIsValid, props]);

    const authError = props.error;
    useEffect(() => {
        if (authError) {
            alert(authError)
        }
    }, [authError,history]);

    if (props.isAuthenticated){
        history.push(routez.SIGNUP);
    }

  return (
      <div className={classes.paper}>
          <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
              Sign Up
          </Typography>
          <form noValidate autoComplete="off" className={classes.form} onSubmit={onSubmitHandler}>
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
      </div>
  );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token != null,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (gmail, name, gender, postalcode, address) => dispatch(authReg(gmail, name, gender, postalcode, address)),
        addAlert: (alert) => dispatch(addAlert(alert))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

