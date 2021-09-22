import React, { useCallback }from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

import { getDates } from "../../api/landpage";
import { addAlert } from '../../store/actions/index';

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
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

function InputFile(props) {
  const classes = useStyles();
  const { email, latitude, longitude, setLatitude, setLongitude, setDates } = props;

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
  }, [email, latitude, longitude, setDates]);

  return (
    <div className={classes.root}>
            <Typography variant="h4">
                Add or Remove note
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6">
                        Latitude
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="standard-basic" label="Latitude" value={latitude} onChange={(event) => inputLatitudeChangeHandler(event)}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6">
                        Longtitude
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="standard-basic" label="Longtitude" value={longitude} onChange={(event) => inputLongitudeChangeHandler(event)}/>
                </Grid>
                <Grid item xs={12} sm={12} className={classes.button}>
                    <ButtonGroup color="primary" aria-label="outlined primary button group" onClick={onSubmitHandler}>
                        <Button>Add Location</Button>
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