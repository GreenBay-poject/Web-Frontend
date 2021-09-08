import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
  Paper,
} from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import CopyrightIcon from "@material-ui/icons/Copyright";

const useStyles = makeStyles((theme) => ({
  font1: {
    fontSize: "35px",
    fontWeight: 400,
    fontFamily: "Verdana",
  },
  font10: {
    fontSize: "27px",
    fontWeight: 500,
    fontFamily: "Sans-serif",
  },
  font2: {
    fontSize: "25px",
    fontFamily: "Sans-serif",
  },
  font3: {
    fontSize: "18px",
    fontFamily: "Sans-serif",
    fontWeight: 50,
  },
  font3: {
    fontSize: "20px",
    fontFamily: "Candara",
    fontWeight: 50,
  },
  icon1: {
    fontSize:50
  },
  button: {
    borderRadius: "30px",
    color: "#ffffff",
    background: "#80bf50",
    width: "200px",
    height: "60px",
    align: "center",
    "&:hover": {
      backgroundColor: "#439922",
      transform: "scale(1.01)",
    },
  },

}));

function ColoredBar() {
  const colors = ["#BCBF50", "#F2EDD0", "#D9B64E", "#D9C589", "#F2F2F2"];
  const classes = useStyles();

  return (
    <Box mt="40px" bgcolor="#40863E"   color="white">
      <Grid container direction="row">
        <Grid item xs={12} sm={6}   align="center" >
          <Box pb="10px">  
          <Box className={classes.font1} pb="30px">
            <b>Contact Us</b>
          </Box>
          <Box className={classes.font2} pb="30px">
            +94 71 252 252
          </Box>
          <Box className={classes.font3} pb="30px">
            greenbaypid3@gmail.com
          </Box>
          <Box className={classes.font4}>
            562/B Armour st, apt 10
            <br />
            Masangaswediya, Colombo,
            <br /> Sri Lanka.
          </Box></Box>
        
        </Grid>
        <Grid item xs={12} sm={6}  align="center" pt="50px" >
          <Box pt="10px" bgcolor="#42923f">
          <Box className={classes.font10} >
            <b>Socialize with Social</b>
          </Box>
          <Box p="50px">
            <Grid container direction="row">
              <Grid item xs>
                <FacebookIcon className={classes.icon1} />
              </Grid>
              <Grid item xs>
                <YouTubeIcon className={classes.icon1} />
              </Grid>
              <Grid item xs>
                <InstagramIcon className={classes.icon1} />
              </Grid>
            </Grid>
          </Box>
          <Box align="Center" pl="50px" pb="20px"><a style={{color:"white"}} href="">About Us</a></Box>

          <Box align="Center" pl="50px">
            Copyright <CopyrightIcon /> GreenBay 2021 All rights reserved.
          </Box></Box>
         
        </Grid>
      </Grid>
    </Box>
  );
}

export default ColoredBar;
