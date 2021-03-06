import {
  Box,
  Grid,
  makeStyles,
} from "@material-ui/core";

import ReplyIcon from "@material-ui/icons/Reply";
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
 
}));

function Answer(props) {
  const classes = useStyles();
  const{ replyPerson,replyDescription}=props.details

  return (
    <Box pl="30px"> 
    <Grid container className={classes.paper} direction="row">
      <Box item xs><ReplyIcon /></Box>
      <Box item xs pl="2px" pt="5px"> <img src="/reply.png" width="25px" alt="user logo"/></Box>
      <Box item xs pl="5px" pt="5px"> {replyPerson}</Box>
    </Grid>

      <Box
        bgcolor="white"
        className={classes.font4}
        borderRadius="15px"
        ml="30px"
        mr="15px"
        mb="20px"
      >
        <text>
         {replyDescription}
        </text>
      </Box>
    </Box>
  );
}

export default Answer;
