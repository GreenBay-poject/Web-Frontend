import { Box, Grid, a, makeStyles } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import CopyrightIcon from "@material-ui/icons/Copyright";

const useStyles = makeStyles((theme) => ({
  font1: {
    fontSize: "35px",
    fontWeight: 500,
    fontFamily: "Sans-serif",
  },
  font10: {
    fontSize: "30px",
    fontWeight: 500,
    fontFamily: "Sans-serif",
  },
  font2: {
    fontSize: "25px",
    fontFamily: "Sans-serif",
  },

  font3: {
    fontSize: "20px",
    fontFamily: "Candara",
    fontWeight: 50,
  },
  icon1: {
    fontSize: 50,
    color: "#FFFFFF",
    "&:hover": {
      color: "#b3ffb3",
    },
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
  aboutus: {
    color: "white",
    "&:hover": { color: "#b3ffb3" },
  },
}));

function ColoredBar() {
  const classes = useStyles();

  return (
    <Box mt="40px" bgcolor="#00796B" color="white">
      <Grid container direction="row">
        <Grid item xs={12} sm={6} align="center">
          <Box pb="10px">
            <Box className={classes.font1} pb="30px" pt="10px">
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
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} align="center" pt="50px">
          <Box pt="10px" bgcolor="#05574F">
            <Box className={classes.font10}>
              <b>Socialize with Social</b>
            </Box>
            <Box p="50px">
              <Grid container direction="row">
                <Grid item xs>
                  <a href="https://www.facebook.com/">
                    <FacebookIcon className={classes.icon1} />
                  </a>
                </Grid>
                <Grid item xs>
                  <a href="https://www.youtube.com/">
                    <YouTubeIcon className={classes.icon1} />
                  </a>
                </Grid>
                <Grid item xs>
                  <a href="https://www.instagram.com/">
                    <InstagramIcon className={classes.icon1} />
                  </a>
                </Grid>
              </Grid>
            </Box>
            <Box align="Center" pb="20px">
              <a className={classes.aboutus} href="https://www.google.com/">
                About Us
              </a>
            </Box>

            <Box align="Center" pb="20px">
              Copyright <CopyrightIcon /> GreenBay 2021 All rights reserved.
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ColoredBar;
