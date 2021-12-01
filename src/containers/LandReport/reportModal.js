import React, { useCallback} from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import 'react-quill/dist/quill.snow.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    ThemeProvider,
    createTheme,
} from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import PieChart from '../LandReport/graph'
import { addAlert } from '../../store/actions/index';

const theme = createTheme({
    palette: {
      primary: green,
    },
});

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'scroll',
    },
    modelpaper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        width: 800,
        display: 'flex',
        flexWrap: 'wrap',
        // '& > *': {
        // margin: theme.spacing(1),
        // width: theme.spacing(16),
        // height: theme.spacing(16),
        // },
        flexDirection: 'Column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressBar: {
        width: '100%',
    },
    inputitems: {
        padding: theme.spacing(0, 0, 2),
    },
    postbutton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: "5px",
        backgroundColor: "rgb(0, 121, 107)",
        color: "white",
        "&:hover": {
            backgroundColor: "#05574F",
            transform: "scale(1.01)",
          },
    },
    large: {
        width: "200px",
        height: "350px",
        objectFit: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
      },
}));

function FeedPage(props) {
  const classes = useStyles();
  const { selectedDate, latitude, longitude, open, handleClose, reportdetails } = props;

  const onSubmitHandler = useCallback((event) => {
      console.log("hiii")
    }, []);

 console.log(reportdetails)

  return (
      <React.Fragment>        
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={open}>
                <Grid container spacing={1} className={classes.modelpaper}>
                    <Grid item xs={12} sm={12}>
                        <h2 id="transition-modal-title" className={classes.inputitems}>Land Report</h2>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <ThemeProvider theme={theme}>
                            <TextField variant="outlined" id="mui-theme-provider-outlined-input" label="Latitude" value={latitude} />
                        </ThemeProvider>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <ThemeProvider theme={theme}>
                            <TextField variant="outlined" id="mui-theme-provider-outlined-input" label="Longtitude" value={longitude}/>
                        </ThemeProvider>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <ThemeProvider theme={theme}>
                            <TextField variant="outlined" id="mui-theme-provider-outlined-input" label="Date" value={selectedDate} />
                        </ThemeProvider>
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                        <img alt="pp" className={classes.large} src={image}/>
                    </Grid> */}
                    <Grid item xs={12} sm={12}>
                        {reportdetails ? <PieChart reportdetails={reportdetails}/> : <CircularProgress/>}
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Button
                            variant="contained"
                            onClick={onSubmitHandler()}
                            className={classes.postbutton}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Fade>
        </Modal>
      </React.Fragment>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
