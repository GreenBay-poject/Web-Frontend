import ImageSlider from "../../components/UI/LandingPage/slider/imageSlider";
import { SliderData } from "../../components/UI/LandingPage/slider/sliderData";
import ImgMediaCard from "../../components/UI/LandingPage/landingcard";
import ColoredBar from "../../components/UI/LandingPage/coloredbar";
import MapExplore from "../../components/UI/LandingPage/mapexplore";
import LandingHeader from "../../components/UI/LandingPage/landingheader";
import Footer from "../../components/UI/footer";
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
  Paper,
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

function Landing() {
  const colors = ["#BCBF50", "#F2EDD0", "#D9B64E", "#D9C589", "#F2F2F2"];
  const classes = useStyles();
  const Data = [
    {
      Name: "Notes",
      image:
        "https://cdn1.vectorstock.com/i/1000x1000/63/30/map-location-cartoon-vector-24766330.jpg",
      Title: "Add Notes",
      Description:
        "You may have found a special places for research,In here you can add notes to your own map.These notes are only visible for you.",
    },
    {
      Name: "Q&A",
      image:
        "https://41dmav17y2a239wj1k1kd0yt-wpengine.netdna-ssl.com/monitor/wp-content/uploads/sites/3/2015/12/Q-A-Forum-1.png",
      Title: "Q & A section",
      Description:
        "You can ask any question related to these material and several authority members are here to answer your questions",
    },
    {
      Name: "Feed",
      image:
        "https://lh3.googleusercontent.com/0MCadRFjDYg1ub6mhOHaOLbjLZugQeGZaBN0Vagkz20jOT9lnyx4NkbeSkWqtVhR",
      Title: "Feed",
      Description:
        "Valueble information and latest updates of sri lanka is here.Explore more to get an idea about what authorities posted",
    },
  ];

  return (
    <Box width="100%">
      <LandingHeader />

      <MapExplore />

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
          <ImageSlider slides={SliderData} />
        </Box>
      </Box>

      <hr color={colors[1]} />

      <Box mt="30px" pl="60px">
        <Grid container direction="row" align="center">
          {Data.map((D) => (
            <Box item xs width="33%" align="left">
              <ImgMediaCard Details={D} />
            </Box>
          ))}
        </Grid>
      </Box>

      <Footer/>
    </Box>
  );
}

export default Landing;
