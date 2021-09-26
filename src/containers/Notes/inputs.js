import React, { useState, useCallback }from 'react';
import { connect } from 'react-redux';
// import { useHistory } from "react-router-dom";

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

import { addNote } from "../../api/notes";
import { addAlert } from '../../store/actions/index';
// import * as routez from '../../shared/routes';

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
  }
}));

const theme = createTheme({
  palette: {
    primary: green,
  },
});

function InputFile(props) {
  const classes = useStyles();
  const { email, latitude, longitude, setLatitude, setLongitude } = props;
  const [textval, setTextVal] = useState();
  // let history = useHistory();

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
            console.log(response.data)
              addAlert("Note Added successfully")
              // history.push(routez.NOTES)
          } else {
              addAlert("Error on loading Private Notes")
          }
        })
  }, [email, latitude, longitude, textval]);

  return (
    <div className={classes.root}>
            <Grid container spacing={3}>
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
                        <TextField variant="outlined" id="mui-theme-provider-outlined-input" label="Note" onChange={(event) => inputTextChangeHandler(event)}/>
                    </ThemeProvider>
                </Grid>
                <Grid item xs={12} sm={12} className={classes.button}>
                    <ButtonGroup color="primary" aria-label="outlined primary button group" onClick={onSubmitHandler}>
                        <Button>Add Note</Button>
                    </ButtonGroup>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(InputFile);