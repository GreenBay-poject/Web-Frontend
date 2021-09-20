import React from "react";
import { connect } from "react-redux";

import Question from "../../components/UI/Questions/question";
import Answer from "../../components/UI/Questions/answer";
import Sidebar from "../../components/UI/Questions/sideBar";
import Qmodal from "../Questions/qmodal";
import Rmodal from "../Questions/replyModal";
import { Questiondata } from "../../components/UI/Questions/dummyData";

import { Box, Button, Grid, makeStyles } from "@material-ui/core";
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
  const classes = useStyles();
  const { isAuthenticated } = props;
  const [openReply, setOpenReply] = React.useState(false);
  const [openQuestion, setOpenQuestion] = React.useState(false);
  const [Authority,setAuthority]=React.useState(Questiondata.Wild_care_Ministry);

  const handleOpenReply = () => {
    setOpenReply(true);
  };

  const handleCloseReply = () => {
    setOpenReply(false);
  };
  const handleOpenQuestion = () => {
    setOpenQuestion(true);
  };

  const handleCloseQuestion = () => {
    setOpenQuestion(false);
  };

  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <Box width="100%">
      <Grid container direction="row">
        <Grid item xs={12} sm={3}>
          <Sidebar  setAuthority={setAuthority} D={Questiondata}/>
        </Grid>

        <Grid item xs={12} sm={9} align="left">
          {!isAuthenticated ? (
            <Button
              variant="contained"
              className={classes.button}
              onClick={handleOpenQuestion}
            >
              <b>Ask Question</b> 
            </Button>
          ) : null}

          {Authority.map((D) => (
            <Box m="15px" bgcolor="#F2F39F" borderRadius="20px" pb="1px">
              <Question details={D} handleDelete={handleDelete} />

              {!isAuthenticated ? (
                <Button
                  variant="contained"
                  className={classes.buttonreply}
                  onClick={handleOpenReply}
                >
                  <b>Add Reply</b>
                </Button>
              ) : null}

              <Answer details={D}/>
            </Box>
          ))}
        </Grid>

        <Qmodal open={openQuestion} handleClose={handleCloseQuestion} />
        <Rmodal open={openReply} handleClose={handleCloseReply} />
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
