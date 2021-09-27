import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Question from "../../components/UI/Questions/question";
import Answer from "../../components/UI/Questions/answer";
import Sidebar from "../../components/UI/Questions/sideBar";
import Qmodal from "../Questions/qmodal";
import Rmodal from "../Questions/replyModal";

import { Box, Button, Grid, makeStyles } from "@material-ui/core";

import { addAlert } from "../../../src/store/actions/index";
import { auth } from "../../../src/store/actions/index";
import { viewQuestions, deleteQuestion } from "../../api/question";

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
  const { isAuthenticated, isAuthorized, email } = props;
  const [openReply, setOpenReply] = React.useState(false);
  const [openQuestion, setOpenQuestion] = React.useState(false);
  const [Authority, setAuthority] = React.useState();
  const [isLoading, setIsLoading] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const [q_idForReply, setQ_idForReply] = useState();
  const [AuthorityString, setAuthorityString] = useState("Wild_care_Ministry"); 

  const handleOpenReply = (q_id) => {
    setQ_idForReply(q_id);
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

  useEffect(() => {
    if (isLoading && email) {
      const data = {
        email: email,
      };
      viewQuestions(data)
        .then((response) => {
          if (!response.error) {
            setQuestionList(response.data.ALL_QUESTIONS);
            setAuthority(response.data.ALL_QUESTIONS.Wild_care_Ministry);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [isLoading, email]);

  const handleDelete = (Qid) => {
    const data = {
      "q_id": Qid,
      "email":email

    };
    if (isAuthenticated) {
      deleteQuestion(data).then((response) => {
        if (!response.error) {
        } else {
          console.log(response);
        }
      });
    }
  };
  console.log(isAuthorized,"Rahal",isAuthenticated)
  return (
    <Box width="100%">
      <Grid container direction="row">
        <Grid item xs={12} sm={3}>
          <Sidebar setAuthorityString={setAuthorityString} setAuthority={setAuthority} D={questionList} />
        </Grid>

        <Grid item xs={12} sm={9} align="left">
          {isAuthorized ? (
            <Button
              variant="contained"
              className={classes.button}
              onClick={handleOpenQuestion}
            >
              <b>Ask Question</b>
            </Button>
          ) : null}
          {Authority
            ? Authority.map((D) => (
                <Box m="15px" bgcolor="#F2F39F" borderRadius="20px" pb="1px">
                  <Question
                    isAuthorized={isAuthorized}
                    q_id={D.q_id}
                    questionPerson={D.uname}
                    questionTitle={D.title}
                    questionDescription={D.question}
                    questionDate={D.dateposted}
                    handleDelete={handleDelete}
                  />

                  <Answer
                    q_id={D.q_id}
                    handleOpenReply={handleOpenReply}
                    isAuthorized={isAuthorized}
                    details={D.answer}
                  />
                </Box>
              ))
            : null}
        </Grid>
        {Authority &&AuthorityString? (
          <>
            <Qmodal
              email={email}
              open={openQuestion}
              Authority={AuthorityString}
              handleClose={handleCloseQuestion}
              isAuthenticated={isAuthenticated}
            />
            <Rmodal
              email={email}
              isAuthenticated={isAuthenticated}
              q_idForReply={q_idForReply}
              open={openReply}
              handleClose={handleCloseReply}
            />
          </>
        ) : null}
      </Grid>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token != null,
    isAuthorized: state.auth.IsAuthorized != null,
    error: state.auth.error,
    email: state.auth.email,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (gmail, password) => dispatch(auth(gmail, password)),
    addAlert: (alert) => dispatch(addAlert(alert)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionAnswer);
