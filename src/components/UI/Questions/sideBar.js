import {
  Box,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  Box1: {
    fontWeight: 100,
    "&:hover": {
      backgroundColor: "#C4C4C4",
      transform: "scale(1.01)",
      align: "center",
    },
  },

  Header1: {
    fontWeight: 500,
    fontSize: "30px",
    paddingLeft: "80px",
  },
}));

function Sidebar(props) {
  const classes = useStyles();
  const {setAuthority,setAuthorityString,D}=props;
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
      <Box mt="40px" className={classes.Box1} p="20px" pl="50px" button onClick={()=>{setAuthorityString("Wild_care_Ministry"); setAuthority(D.Wild_care_Ministry)}}>
        Wild care Ministry{" "}
      </Box>
      <Box className={classes.Box1} p="20px" pl="50px" button onClick={()=>{setAuthorityString("Pollute_managing_Unit") ;setAuthority(D.Pollute_managing_Unit)}}>
        Pollute managing Unit{" "}
      </Box>
      <Box className={classes.Box1} p="20px" pl="50px" button onClick={()=>{setAuthorityString("Emergency_Wildfire_Unit"); setAuthority(D.Emergency_Wildfire_Unit)}}>
        Endemic Tree Unit
      </Box>
      <Box className={classes.Box1} p="20px" pl="50px" button onClick={()=>{setAuthorityString("Land_Soil_Ministry"); setAuthority(D.Land_Soil_Ministry)}}>
        Emergency Wildfire Unit
      </Box>
      <Box className={classes.Box1} p="20px" pl="50px" button onClick={()=>{setAuthorityString("Endemic_Tree_Unit") ;setAuthority(D.Endemic_Tree_Unit)}}>
        Land & Soil Ministry
      </Box>
      <Box className={classes.Box1} p="20px" pl="50px" button onClick={()=>{setAuthorityString("Geographical_Unit"); setAuthority(D.Geographical_Unit)}}>
        Geographical Unit
      </Box>
      <Box className={classes.Box1} p="20px" pl="50px" button onClick={()=>{setAuthorityString("Others"); setAuthority(D.Others)}}>
        Other Units
      </Box>

    </Box>
  );
}

export default Sidebar;
