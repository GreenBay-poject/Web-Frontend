import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Question from "../../components/UI/Questions/question";
import Answer from "../../components/UI/Questions/answer";
import Sidebar from "../../components/UI/Questions/sideBar";
import Qmodal from "../Questions/qmodal";
import Rmodal from "../Questions/replyModal";
import DeleteModel from "../Questions/delModal";

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
  Box2: {
    fontWeight: 500,
    fontSize: "25px",
    margin: "30px",
    align: "middle",
    color: "#00796B",
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
    background: "#00796B",
    width: "200px",
    height: "60px",
    align: "center",
    "&:hover": {
      backgroundColor: "#05574F",
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
  const [openDelete, setOpenDelete] = React.useState(false);
  const [Authority, setAuthority] = React.useState();
 // const [isLoading, setIsLoading] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const [q_idForReply, setQ_idForReply] = useState();
  const [q_idForDelete, setQ_idForDelete] = useState();
  const [AuthorityString, setAuthorityString] = useState("Wild_care_Ministry");
  const [AuthorityWord, setAuthorityWord] = useState("Wild Care Ministry");
  const [updateConst, setUpdateConst] = useState(0);

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
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  useEffect(() => {
    if (email) {
      const data = {
        email: email,
      };
      viewQuestions(data)
        .then((response) => {
          if (!response.error) {
            setQuestionList(response.data.ALL_QUESTIONS);
            switch (AuthorityString) {
              case "Wild_care_Ministry":
                setAuthority(response.data.ALL_QUESTIONS.Wild_care_Ministry);
                break;
              case "Pollute_managing_Unit":
                setAuthority(response.data.ALL_QUESTIONS.Pollute_managing_Unit);
                break;
              case "Endemic_Tree_Unit":
                setAuthority(response.data.ALL_QUESTIONS.Endemic_Tree_Unit);
                break;
              case "Emergency_Wildfire_Unit":
                setAuthority(response.data.ALL_QUESTIONS.Emergency_Wildfire_Unit);
                break;
              case "Land_Soil_Ministry":
                setAuthority(response.data.ALL_QUESTIONS.Land_Soil_Ministry);
                break;
              case "Geographical_Unit":
                setAuthority(response.data.ALL_QUESTIONS.Geographical_Unit);
                break;
              default:
                setAuthority(response.data.ALL_QUESTIONS.Others);
            }
          }
        })
       // .finally(() => setIsLoading(false));
    }
  }, [updateConst, email,AuthorityString]);

  const handleDelete = () => {
    const data = {
      question_id: q_idForDelete,
      email: email,
    };
    if (isAuthenticated) {
      deleteQuestion(data).then((response) => {
        if (!response.error) {
          console.log(response);
          setUpdateConst((count) => count + 1);
          handleCloseDelete();
        } else {
        }
      });
    }
  };

  return (
    <Box width="100%">
      <Grid container direction="row">
        <Grid item xs={12} sm={3}>
          <Sidebar
            setAuthorityString={setAuthorityString}
            setAuthority={setAuthority}
            setAuthorityWord={setAuthorityWord}
            D={questionList}
          />
        </Grid>

        <Grid item xs={12} sm={9} align="left">
          {console.log(456, typeof isAuthorized)}
          {isAuthorized ? (
            <Grid container direction="row">
              <Button
                variant="contained"
                className={classes.button}
                onClick={handleOpenQuestion}
              >
                <b>Ask Question</b>
              </Button>
              <Box className={classes.Box2}>{AuthorityWord}</Box>
            </Grid>
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
                    setQ_idForDelete={setQ_idForDelete}
                    handleOpenDelete={handleOpenDelete}
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
        {AuthorityString ? (
          <Qmodal
            email={email}
            open={openQuestion}
            Authority={AuthorityString}
            handleClose={handleCloseQuestion}
            isAuthenticated={isAuthenticated}
            setUpdateConst={setUpdateConst}
          />
        ) : null}
        {q_idForReply ? (
          <Rmodal
            email={email}
            isAuthenticated={isAuthenticated}
            q_idForReply={q_idForReply}
            open={openReply}
            handleClose={handleCloseReply}
            setUpdateConst={setUpdateConst}
          />
        ) : null}

        <DeleteModel
          open={openDelete}
          handleClose={handleCloseDelete}
          handleDelete={handleDelete}
        />
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
