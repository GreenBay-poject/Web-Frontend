import { Box, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  Box1: {
    fontWeight: 500,
    "&:hover": {
      backgroundColor: "#C4C4C4",
      transform: "scale(1.01)",
      align: "center",
    },
  },
  Box2: {
    fontWeight: 500,
    backgroundColor: "#C4C4C4",
    transform: "scale(1.01)",
    align: "center",
  },

  Header1: {
    fontWeight: 500,
    fontSize: "30px",
    paddingLeft: "80px",
  },
}));

function Sidebar(props) {
  const classes = useStyles();
  const { setAuthority, setAuthorityString, setAuthorityWord, D } = props;
  const [Barnumber,setBarnumber]=useState();

  return (
    <Box align="left" mt="30px">
      <Typography
        variant="h4"
        gutterBottom
        align="left"
        className={classes.Header1}
      >
        <b>Authorities</b>
      </Typography>
      <Box
        mt="40px"
        className={Barnumber===1?classes.Box2:classes.Box1}
        p="20px"
        pl="50px"
        button
        onClick={() => {
          setAuthorityWord("Wild Care Ministry");
          setAuthorityString("Wild_care_Ministry");
          setAuthority(D.Wild_care_Ministry);
          setBarnumber(1)
        }}
      >
        Wild Care Ministry
      </Box>
      <Box
        className={Barnumber===2?classes.Box2:classes.Box1}
        p="20px"
        pl="50px"
        button
        onClick={() => {
          setAuthorityWord("Pollute Managing Unit");
          setAuthorityString("Pollute_managing_Unit");
          setAuthority(D.Pollute_managing_Unit);
          setBarnumber(2)
        }}
      >
        Pollute Managing Unit
      </Box>
      <Box
        className={Barnumber===3?classes.Box2:classes.Box1}
        p="20px"
        pl="50px"
        button
        onClick={() => {
          setAuthorityWord("Endemic Tree Unit");
          setAuthorityString("Endemic_Tree_Unit");
          setAuthority(D.Endemic_Tree_Unit);
          setBarnumber(3)
        }}
      >
        Endemic Tree Unit
      </Box>
      <Box
        className={Barnumber===4?classes.Box2:classes.Box1}
        p="20px"
        pl="50px"
        button
        onClick={() => {
          setAuthorityWord("Emergency Wildfire Unit");
          setAuthorityString("Emergency_Wildfire_Unit");
          setAuthority(D.Emergency_Wildfire_Unit);
          setBarnumber(4)
        }}
      >
        Emergency Wildfire Unit
      </Box>
      <Box
        className={Barnumber===5?classes.Box2:classes.Box1}
        p="20px"
        pl="50px"
        button
        onClick={() => {
          setAuthorityWord("Land & Soil Ministry");
          setAuthorityString("Land_Soil_Ministry");
          setAuthority(D.Land_Soil_Ministry);
          setBarnumber(5)
        }}
      >
        Land & Soil Ministry
      </Box>
      <Box
        className={Barnumber===6?classes.Box2:classes.Box1}
        p="20px"
        pl="50px"
        button
        onClick={() => {
          setAuthorityWord("Geographical Unit");
          setAuthorityString("Geographical_Unit");
          setAuthority(D.Geographical_Unit);
          setBarnumber(6)
        }}
      >
        Geographical Unit
      </Box>
      <Box
        className={Barnumber===7?classes.Box2:classes.Box1}
        p="20px"
        pl="50px"
        button
        onClick={() => {
          setAuthorityWord("Other Units");
          setAuthorityString("Others");
          setAuthority(D.Others);
          setBarnumber(7)
        }}
      >
        Other Units
      </Box>
    </Box>
  );
}

export default Sidebar;
