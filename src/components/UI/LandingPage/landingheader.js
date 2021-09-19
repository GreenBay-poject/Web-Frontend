import { Box, Grid, Typography } from "@material-ui/core";


function LandingHeader() {
  const colors = ["#BCBF50", "#F2EDD0", "#D9B64E", "#D9C589", "#F2F2F2"];

  return (
    <Box height="120px" fontSize="lg" pt="20px" pl="60px">
      <Grid container direction="row" >
        <Grid item xs={4} sm={1} align="left" >
          <img src="/Logo96.png" alt="logo"/>
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
