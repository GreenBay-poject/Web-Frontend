import React, { useState, useCallback }from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {
  ThemeProvider,
  createTheme,
} from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import { toast } from 'react-toastify';

import { addNote } from "../../api/notes";
import { addAlert } from '../../store/actions/index';
import * as routez from '../../shared/routes';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
    },
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: "white"
  },
  buttonclr: {
    backgroundColor: "rgb(197, 225, 165)"
  },
  submit: {
    backgroundColor: "rgb(0, 121, 107)",
    color: "white",
    "&:hover": {
        backgroundColor: "#05574F",
        transform: "scale(1.01)",
      },
},
}));

const theme = createTheme({
  palette: {
    primary: green,
  },
});

function InputFile(props) {
  const classes = useStyles();
  const { email, latitude, longitude, setLatitude, setLongitude, isAuthorized, setPrivateNotes, setPublicNotes, isAuthenticated, setIsLoading } = props;
  const [textval, setTextVal] = useState();
  let history = useHistory();

  const inputTextChangeHandler = useCallback((event) => {
    console.log(event.target.value)
    setTextVal(event.target.value)
  }, [setTextVal]);

  const inputLatitudeChangeHandler = useCallback((event) => {
    setLatitude(event.target.value)
  }, [setLatitude]);

  const inputLongitudeChangeHandler = useCallback((event) => {
    setLongitude(event.target.value)
  }, [setLongitude]);

  const onSubmitHandler = useCallback(() => {
    if (!isAuthenticated){
      history.push(routez.SIGNIN)
    }
    setIsLoading(true)
    const data ={
        "email": email,
        "lat": latitude,
        "lon": longitude,
        "text": textval,
    }
    console.log(data)
    addNote(data)
        .then((response) => {
          if (!response.error) {
            if (isAuthorized){
              setPublicNotes(response.data.ALL_NOTES)
              toast.success('Note Added Successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }else{
              setPrivateNotes(response.data.All_Notes_user)
            }
          } else {
            toast.error('Error on loading Private Notes!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
          }
        }).finally(() => setIsLoading(false));
  }, [email, latitude, longitude, textval, setPublicNotes, setPrivateNotes, isAuthorized, isAuthenticated, history, setIsLoading]);

  return (
    <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                  <ThemeProvider theme={theme}>
                      <TextField variant="outlined" id="mui-theme-provider-outlined-input" value={latitude} onChange={(event) => inputLatitudeChangeHandler(event)}/>
                  </ThemeProvider>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <ThemeProvider theme={theme}>
                      <TextField variant="outlined" id="mui-theme-provider-outlined-input" value={longitude} onChange={(event) => inputLongitudeChangeHandler(event)}/>
                  </ThemeProvider>
                </Grid>
                <Grid item xs={12} sm={12}>
                   <ThemeProvider theme={theme}>
                        <TextField variant="outlined" id="mui-theme-provider-outlined-input" class={"textinput"} label="Note" onChange={(event) => inputTextChangeHandler(event)}/>
                    </ThemeProvider>
                </Grid>
                <Grid item xs={12} sm={12} className={classes.button}>
                    <ButtonGroup aria-label="outlined button group" onClick={onSubmitHandler}>
                        <Button id="addnotebtn" className={classes.buttonclr}>Add Note</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token != null,
        isAuthorized: state.auth.IsAuthorized != null,
        error: state.auth.error,
        email: state.auth.email
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        addAlert: (alert) => dispatch(addAlert(alert))
    }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(InputFile);