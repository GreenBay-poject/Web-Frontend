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
    font2: {
      color: "grey",
      fontSize: "20px",
      fontWeight: 700,
      fontFamily: "Candara",
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
  
  function MapExplore() {
    const colors = ["#BCBF50", "#F2EDD0", "#D9B64E", "#D9C589", "#F2F2F2"];
    const classes = useStyles();
   
  
    return (
        <Box pt="20px" pl="60px" pr="5px">
          <Grid container direction="row">
            <Box item xs align="right" width="60%">
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
              <Grid container direction="row">
                <Box item xs >
                  <Button variant="contained" className={classes.button}>
                    <b>Explore Map</b>
                  </Button>
                </Box>
                <Box item xs pl="20px" >
                  <Button variant="contained" className={classes.button}>
                    <b>Sign In</b>
                  </Button>
                </Box>
              </Grid>
            </Box>
  
            <Box item xs width="40%" fontWeight="semibold" fontWeight="bold">
              <img
                src="/Slideimg/2.jpg"
                width="100%"
                className={classes.image1}
              />
            </Box>
          </Grid>
        </Box>
    );
  }
  
  export default MapExplore;
  