import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import EcoIcon from "@material-ui/icons/Eco";
import ExploreIcon from "@material-ui/icons/Explore";
import DataUsageIcon from "@material-ui/icons/DataUsage";
import AssessmentIcon from "@material-ui/icons/Assessment";
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

function ColoredBar() {
  const colors = ["#BCBF50", "#F2EDD0", "#D9B64E", "#D9C589", "#F2F2F2"];
  const classes = useStyles();

  return (
    <Box width="100%" mt="40px" bgcolor={colors[2]} color="white" pt="20px" pb="20px">
      <Typography
        color="white"
        variant="h4"
        gutterBottom
        align="center"
        className={classes.Header1}
      >
        <b>Documentation for Researchers, Environmentalists and Students</b>
      </Typography>

      <Grid container direction="row"  className={classes.font3} >
        <Grid item xs={12} sm={6}  align="left">
          <Box pl="60px">
            <EcoIcon className={classes.icon1} />
            <b> See Feeds by Sri Lankan Authorities</b>
          </Box>
          <Box pt="40px" pl="60px" pb="40px">
            <DataUsageIcon className={classes.icon1} />
            <b> See Special Notes On Maps by Authorities</b>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} align="left">
          <Box pl="60px">
            <AssessmentIcon className={classes.icon1} />
            <b> Generate Your Own Report Easily</b>
          </Box>
          <Box pt="40px" pl="60px">
            <ExploreIcon className={classes.icon1} />
            <b> Share Important Reports</b>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ColoredBar;
