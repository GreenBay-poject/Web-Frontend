import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";


import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";

import * as routez from '../../../shared/routes';
import { addAlert, authLogout } from '../../../store/actions/index';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    width: "100%",
  },
  Header2: {
    fontFamily: "Trebuchet MS",
    fontWeight: 500,
    fontSize: "55px",
  },
  Header3: {
    fontFamily: "Segoe UI",
    fontWeight: 400,
    textAlign: "center",
  },

  Header1: {
    fontWeight: 500,
    fontSize: "37px",
  },
  font3: {
    fontSize: "20px",
    fontFamily: "Sans-serif",
    color: "black",
  },
  font2: {
    color: "grey",
    fontSize: "20px",
    fontWeight: 400,
    fontFamily: "Candara",
  },
  image1: {
    borderRadius: "10px",
  },
  icon1: {
    color: "black",
    width: "20px",
  },
  button: {
    borderRadius: "30px",
    color: "#ffffff",
    background: "#00796B",
    width: "170px",
    height: "60px",
    align: "center",
    "&:hover": {
      backgroundColor: "#05574F",
      transform: "scale(1.01)",
    },
  },
}));

function MapExplore(props) {
  const { isAuthenticated } = props;
  const classes = useStyles();
  let history = useHistory();

  return (
    <Box pt="20px" pl="60px" pr="5px">
      <Grid container direction="row" spacing={1}>
        <Grid item xs align="right">
          <Box>
            <Typography
              variant="h2"
              gutterBottom
              align="left"
              className={classes.Header2}
            >
              <b>Explore the Map!!! Track Deforestation with Green Bay</b>
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom align="left">
              <b>Best Land Tracking Website in Sri Lanka</b>
            </Typography>
          </Box>

          <Box pr="15px">
            <p
              gutterBottom
              align="left"
              fontFamily="monospace"
              className={classes.font2}
            >
              Easily select a given area and put date or date range.Get your
              search report now.Valuable Geographical data provider for
              research, Study materials - Share now !!!
            </p>
          </Box>
          <Grid container direction="row" spacing={3} align="left">
            <Grid item xs={12} sm={4}>
                <Button variant="contained" title={"LandReport"} className={classes.button} onClick={() => history.push(routez.LANDREPORT)}>
                  <b>Land Report</b>
                </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Button variant="contained" title={"DeforestationReport"} className={classes.button} onClick={() => history.push(routez.DEFORESTATIONREPORT)}>
                  <b>Land Compare</b>
                </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Button variant="contained" title={"profilebtn"} className={classes.button} onClick={() => {isAuthenticated ? history.push(routez.USER_PROFILE) : history.push(routez.SIGNIN)}}>
                  <b>{isAuthenticated ? "My Profile" : "Sign In"}</b>
                </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} fontWeight="semibold">
          <img src="/Slideimg/2.jpg" width="100%" className={classes.image1} alt="header" />
        </Grid>
      </Grid>
    </Box>
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
      onAuthLogout: () => dispatch(authLogout()),
      addAlert: (alert) => dispatch(addAlert(alert))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MapExplore);
