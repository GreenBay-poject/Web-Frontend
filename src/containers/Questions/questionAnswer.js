import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Question from "../../components/UI/Questions/question";
import Answer from "../../components/UI/Questions/answer";
import Sidebar from "../../components/UI/Questions/sideBar";
import Qmodal from "../../components/UI/Questions/qmodal";
import Rmodal from "../../components/UI/Questions/replyModal";

import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { addAlert } from "../../../src/store/actions/index";
import { auth } from "../../../src/store/actions/index";

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

function QuestionAnswer(props) {
  const colors = ["#BCBF50", "#F2EDD0", "#D9B64E", "#D9C589", "#F2F2F2"];
  const classes = useStyles();
  const { isAuthenticated } = props;
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box width="100%">
      <Grid container direction="row">
        <Grid item xs={12} sm={3}>
          {" "}
          <Sidebar />
        </Grid>

        <Grid item xs={12} sm={9} align="left">
          <Button
            variant="contained"
            className={classes.button}
            onClick={handleOpen}
            hidden={!isAuthenticated}
          >
            <b>Ask Question</b>
          </Button>
          <Box m="15px" bgcolor="#F2F39F" borderRadius="20px" pb="1px">
            <Question />
            <Button
              variant="contained"
              className={classes.buttonreply}
              onClick={handleOpen}
              hidden={!isAuthenticated}
            >
              <b>Add Reply</b>
            </Button>

            <Answer />
          </Box>
        </Grid>
        <Qmodal open={open} handleClose={handleClose} />
        <Rmodal open={open} handleClose={handleClose} />
      </Grid>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token != null,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (gmail, password) => dispatch(auth(gmail, password)),
    addAlert: (alert) => dispatch(addAlert(alert)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionAnswer);