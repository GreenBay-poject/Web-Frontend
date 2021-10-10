import { Box, Grid, Typography } from "@material-ui/core";


function LandingHeader() {
  const colors = ["#BCBF50", "#F2EDD0", "#D9B64E", "#D9C589", "#F2F2F2"];

  return ( 

    <Box height="120px" fontSize="lg" pt="20px" pl="60px">
      <Grid container direction="row" >
        <Grid item xs={4} sm={1} align="left" >
          <img src="/Logo96.png" alt="logo"/>
        </Grid>
        <Grid item xs={8} sm={3} color={colors[0]} pt="25px">
          <Typography variant="h4" gutterBottom align="left">
           <Box color="#00796B"> <b>GreenBay</b></Box>
          </Typography>
        </Grid>
        <Grid item xs={4} sm={2} align="left" >
          <img width="150px" src="/Slideimg/3.png" alt="logo"/>
        </Grid>
        <Grid item xs={4} sm={2} align="left" >
          <img width="150px" src="/Slideimg/3.png" alt="logo"/>
        </Grid>
        <Grid item xs={4} sm={2} align="left" >
          <img width="150px" src="/Slideimg/3.png" alt="logo"/>
        </Grid>
        <Grid item xs={4} sm={2} align="left" >
          <img width="150px" src="/Slideimg/3.png" alt="logo"/>
        </Grid>
      </Grid>
    </Box>

  );
}

export default LandingHeader;
