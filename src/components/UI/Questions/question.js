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
    paper2: {
      textAlign: "left",
      fontWeight: 400,
      color:"grey"
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
  
  function Question(props) {
    const {setQ_idForDelete,isAuthorized,handleOpenDelete}=props;
    const{ q_id,questionPerson,questionTitle,questionDescription,questionDate}=props;
    const classes = useStyles(); 
    var index1 = questionTitle.indexOf("@"); 
    var Qtitle = questionTitle.substr(index1 + 1);
    var index2 = questionDate.indexOf("T"); 
    var Qdate = questionDate.substr(0,index2);

    return (
      <Box>
            <Box pl="30px" pt="10px">
              <Grid container direction="row">
                <Grid item xs={9} sm={11} className={classes.paper} >
                  
                  <Grid container className={classes.paper} direction="row">
                    <Box item xs> <img src="/question.png" width="30px" alt="userlogo" /></Box>
                    <Box item xs pl="10px" pt="5px"> {questionPerson}</Box>
                    <Box item xs pl="5px" pt="5px" className={classes.paper2}> {Qdate}</Box>
                  </Grid>

                </Grid>
               
                <Grid item xs={3} sm={1} className={classes.paper} >
                  {isAuthorized?<DeleteIcon  className={classes.delete} onClick={()=>{setQ_idForDelete(q_id);handleOpenDelete()}}/>:null}
                </Grid>
              </Grid>
            </Box>
            <text className={classes.font2}>
              <u>{Qtitle}</u>
            </text>
            <br />
            <Box className={classes.font3}>
              <text>
              {questionDescription}
              </text>
            </Box>
    </Box>
    );
  }
  
  export default Question;
  