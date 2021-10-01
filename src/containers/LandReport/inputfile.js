import React, { useCallback }from 'react';
import { connect } from 'react-redux';

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

import { getDates } from "../../api/landpage";
import { addAlert } from '../../store/actions/index';

const theme = createTheme({
  palette: {
    primary: green,
  },
});

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
  },
  buttonclr: {
    backgroundColor: "rgb(0, 121, 107)",
        color: "white",
    "&:hover": {
      backgroundColor: "#05574F",
      transform: "scale(1.01)",
    },
  }
}));

function InputFile(props) {
  const classes = useStyles();
  const {latitude, longitude, setLatitude, setLongitude, setDates } = props;

  const inputLatitudeChangeHandler = useCallback((event) => {
    setLatitude(event.target.value)
  }, [setLatitude]);

  const inputLongitudeChangeHandler = useCallback((event) => {
    setLongitude(event.target.value)
  }, [setLongitude]);

  const onSubmitHandler = useCallback(() => {
    const data ={
        "lat": latitude,
        "lon": longitude,
    }
    console.log(data)
    getDates(data)
        .then((response) => {
          if (!response.error) {
            setDates(response.data)
          } else {
              addAlert("Error on loading Private Notes")
          }
        })
  }, [latitude, longitude, setDates]);

  return (
    <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <ThemeProvider theme={theme}>
                      <TextField variant="outlined" id="mui-theme-provider-outlined-input" label="Latitude" value={latitude} onChange={(event) => inputLatitudeChangeHandler(event)}/>
                  </ThemeProvider>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <ThemeProvider theme={theme}>
                      <TextField variant="outlined" id="mui-theme-provider-outlined-input" label="Longtitude" value={longitude} onChange={(event) => inputLongitudeChangeHandler(event)}/>
                  </ThemeProvider>
                </Grid>
                <Grid item xs={12} sm={12} className={classes.button}>
                    <ButtonGroup aria-label="outlined primary button group" onClick={onSubmitHandler}>
                        <Button id="addlocationbtn" className={classes.buttonclr}>Add Location</Button>
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