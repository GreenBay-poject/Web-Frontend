import {
    Box,
    Grid,
    makeStyles,
  } from "@material-ui/core";
  import DeleteIcon from "@material-ui/icons/Delete";
  
  const useStyles = makeStyles((theme) => ({
    Box1: {
      fontWeight: 100,
      "&:hover": {
        backgroundColor: "#C4C4C4",
        transform: "scale(1.01)",
        align: "center",
      },
    },
    paper: {
      textAlign: "left",
      fontWeight: 600,
    },
    font1: {
      color: "grey",
      fontSize: "40px",
      fontWeight: 700,
      fontFamily: "Candara",
    },
    font2: {
      color: "green",
      fontWeight: 600,
  
      paddingLeft: "30px",
    },
    font3: {
      paddingTop: "10px",
      fontWeight: 500,
      paddingLeft: "30px",
    },
    font4: {
      paddingTop: "2px",
      paddingBottom: "2px",
      fontWeight: 500,
      paddingLeft: "15px",
      paddingRight: "15px",
      fontSize: "13px",
    },
  
    Header1: {
      fontWeight: 500,
      fontSize: "30px",
      paddingLeft: "80px",
    },
    button: {
      margin: "20px",
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
    buttonreply: {
      margin: "10px",
      borderRadius: "20px",
      color: "#ffffff",
      background: "#D19829",
      width: "150px",
      height: "40px",
      align: "center",
      marginLeft: "50px",
      "&:hover": {
        backgroundColor: "#BE8515",
        transform: "scale(1.01)",
      },
    },
    delete: {
      "&:hover": {
        color: "#ED1515",

      },
    },
    reply: {
      paddingLeft: "30px",
      paddingTop: "5px",
    },
  }));
  
  function Answer() {
    const colors = ["#BCBF50", "#F2EDD0", "#D9B64E", "#D9C589", "#F2F2F2"];
    const classes = useStyles();
  
    return (
      <Box>
            <Box pl="30px" pt="10px">
              <Grid container direction="row">
                <Grid item xs={9} sm={11} className={classes.paper} >
                  
                  <Grid container className={classes.paper} direction="row">
                    <Box item xs> <img src="/question.png" width="30px" /></Box>
                    <Box item xs pl="10px" pt="5px"> Rahal Athukorala</Box>
                  </Grid>

                </Grid>
               
                <Grid item xs={3} sm={1} className={classes.paper} >
                  <DeleteIcon  className={classes.delete} />
                </Grid>
              </Grid>
            </Box>
            <text className={classes.font2}>
              <u>Deforestation near Sinharaja</u>
            </text>
            <br />
            <Box className={classes.font3}>
              <text>
                In 2017 Forest side near Sinharaja Prantha Aranya Senasanaya is
                a primary rain forest land, But now the forest percentage of
                that land became 20% . What is the reason for these
                transformation?{" "}
              </text>
            </Box>
    </Box>
    );
  }
  
  export default Answer;
  