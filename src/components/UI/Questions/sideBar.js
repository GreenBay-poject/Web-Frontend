import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
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
  reply: {
    paddingLeft: "30px",
    paddingTop: "5px",
  },
}));

function Sidebar() {
  const colors = ["#BCBF50", "#F2EDD0", "#D9B64E", "#D9C589", "#F2F2F2"];
  const classes = useStyles();

  return (
    <Box align="left"  mt="30px">
      <Typography
        variant="h4"
        gutterBottom
        align="left"
        className={classes.Header1}
      >
        <b>Authorities</b>
      </Typography>
      <Box mt="40px" className={classes.Box1} p="20px" pl="50px">
        Wild care Ministry{" "}
      </Box>
      <Box className={classes.Box1} p="20px" pl="50px">
        Pollute managing Unit{" "}
      </Box>
      <Box className={classes.Box1} p="20px" pl="50px">
        Endemic Tree Unit
      </Box>
      <Box className={classes.Box1} p="20px" pl="50px">
        Emergency Wildfire Unit
      </Box>
      <Box className={classes.Box1} p="20px" pl="50px">
        Land & Soil Ministry
      </Box>
      <Box className={classes.Box1} p="20px" pl="50px">
        Geographical Unit
      </Box>
    </Box>
  );
}

export default Sidebar;
