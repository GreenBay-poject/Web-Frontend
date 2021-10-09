import React from 'react';
import { connect } from 'react-redux';

import Slider from "../../components/UI/LandingPage/slider/Slider";
import ImgMediaCard from "../../components/UI/LandingPage/landingcard";
import ColoredBar from "../../components/UI/LandingPage/coloredbar";
import MapExplore from "../../components/UI/LandingPage/mapexplore";
import LandingHeader from "../../components/UI/LandingPage/landingheader";
import Footer from "../../components/UI/footer";

import { addAlert } from '../../../src/store/actions/index';
import { auth } from '../../../src/store/actions/index';
import SingleLineImageList from '../Landing/postlist'

import {
  Box,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    width: "100%",
  },

  Header3: {
    fontFamily: "Segoe UI",
    fontWeight: 400,
    textAlign: "center",
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
}));

function Landing(props) {
  const colors = ["#BCBF50", "#F2EDD0", "#D9B64E", "#D9C589", "#F2F2F2"];
  const {isAuthenticated}=props;
  const classes = useStyles();
  const Data = [
    {
      Name: "Notes",
      image:
        "Notes.jpg",
      Title: "Add Notes",
      Description:
        "You may have found a special places for research,In here you can add notes to your own map.These notes are only visible for you.",
    },
    {
      Name: "Q&A",
      image:
        "Q-A-Forum.png",
      Title: "Q & A section",
      Description:
        "You can ask any question related to these material and several authority members are here to answer your questions",
    },
    {
      Name: "Feed",
      image:
        "Feed.jpg",
      Title: "Feed",
      Description:
        "Valueble information and latest updates of sri lanka is here.Explore more to get an idea about what authorities posted",
    },
  ];

  return (
    <Box>
      <LandingHeader />
      <Slider />
      <MapExplore  isAuthenticated={isAuthenticated}/>

      <Box mt="30px" pl="60px">
        <Grid container direction="row" align="center" >
          {Data.map((D) => (
            <Grid item xs={12} sm={4}  align="left">
              <ImgMediaCard  isAuthenticated={isAuthenticated} Details={D} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <ColoredBar />
      
      <Box mb="15px">
        <hr color={colors[1]} />

        <Box pt="20px" pl="60px" pr="5px" mb="50px">
          <Typography
            variant="h2"
            gutterBottom
            align="left"
            className={classes.Header3}
          >
            <b>The Smartest Online Platform to Save Forests</b>
          </Typography>
          <Box className={classes.font2}>
            This website will help you identify the Difference of Past and
            Present Geographical View of Selected Area{" "}
          </Box>
          <Box className={classes.font2}>
            With the Time ,Forests are at Risk.This website will help you
            identify the Difference of Past and Present Geographical View of
            Selected Area{" "}
          </Box>
        </Box>
        <Box>
          <SingleLineImageList/>
        </Box>
      </Box>
      <Footer />
    </Box>
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
      onAuth: (gmail, password) => dispatch(auth(gmail, password)),
      addAlert: (alert) => dispatch(addAlert(alert))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);