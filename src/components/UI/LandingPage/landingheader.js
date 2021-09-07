import { Box, Grid, makeStyles, Typography } from "@material-ui/core";

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

function LandingHeader() {
  const colors = ["#BCBF50", "#F2EDD0", "#D9B64E", "#D9C589", "#F2F2F2"];
  const classes = useStyles();

  return (
    <Box height="120px" fontSize="lg" pt="20px" pl="60px">
      <Grid container direction="row" >
        <Grid item xs={4} sm={1} align="left" >
          <img src="/Logo96.png" />
        </Grid>
        <Grid item xs={8} sm={11} color={colors[0]} pt="25px">
          <Typography variant="h4" gutterBottom align="left">
            <b>GreenBay</b>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LandingHeader;
