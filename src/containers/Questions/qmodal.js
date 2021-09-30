import React, { useState, useCallback } from "react";
//import Axios from 'axios';
//import { connect } from 'react-redux';

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Box, Button, TextField } from "@material-ui/core";

import { checkValidity } from "../../shared/validate";
import { updateObject } from "../../shared/utility";
import { addQuestion } from "../../api/question";

const inputDefinitions = {
  title: {
    validations: {
      required: true,
      minLength: 10,
      maxLength: 50,
      validationErrStr: "Use  10 - 50 characters for your title",
    },
  },
  description: {
    validations: {
      // required: false,
      // minLength: 2,
      // maxLength: 40,
      validationErrStr: "Use between 6 and 40 characters for your  description",
    },
  },
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflowY: "scroll",
  },
  modelpaper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: 400,
  },
  progressBar: {
    width: "100%",
  },
  inputitems: {
    padding: theme.spacing(0, 0, 2),
  },
  lableInput: {
    color: "red",
  },
  postbutton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5px",
    backgroundColor: "#00796B",
    "&:hover": {
      backgroundColor: "#05574F",
      transform: "scale(1.01)",
    },
  },
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const {
    email,
    open,
    handleClose,
    Authority,
    isAuthenticated,
    setUpdateConst,
  } = props;

  //const [quillVal, setQuillVal] = React.useState(false);

  const [inputIsValid, setInputIsValid] = useState({
    title: true,
    description: true,
  });

  const [stateObj, setStateObj] = useState({
    title: "",
    description: "",
  });

  const inputChangeHandler = useCallback(
    (event, inputId) => {
      let validationConst = inputDefinitions[inputId].validations;
      let isValid = checkValidity(validationConst, event.target.value);
      setInputIsValid(updateObject(inputIsValid, { [inputId]: isValid }));
      setStateObj(updateObject(stateObj, { [inputId]: event.target.value }));
    },
    [stateObj, inputIsValid]
  );

  const onSubmitHandler = useCallback(
    (event) => {
      const QTitle = Authority + "@" + stateObj.title;
      const data = {
        email: email,
        title: QTitle,
        question: stateObj.description,
      };
      if (isAuthenticated) {
        addQuestion(data).then((response) => {
          if (!response.error) {
            console.log("successfull q modal");
            setUpdateConst((count) => count + 1);
            handleClose();
          } else {
            console.log("unsuccessfull q modal");
            console.log(response);
          }
        });
      }
    },
    [email, stateObj.title, stateObj.description]
  );

  /* const onChange = (value) => {
    console.log(typeof(value))
    setQuillVal(value)
  }
*/
  return (
    <React.Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        //closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.modelpaper}>
            <h2 id="transition-modal-title" className={classes.inputitems}>
              Add new question
            </h2>
            <h4 id="transition-modal-title">Question Title</h4>
            <TextField
              id="outlined-textarea"
              label="Title"
              placeholder="Enter the question title"
              multiline
              fullWidth
              variant="outlined"
              className={classes.inputitems}
              onChange={(event) => inputChangeHandler(event, "title")}
            />

            <Box color="red">
              {!inputIsValid.title
                ? inputDefinitions.title.validations.validationErrStr
                : null}
            </Box>

            <h4 id="transition-modal-title">Add Description</h4>
            <TextField
              id="outlined-textarea"
              label="Description"
              rows="10"
              placeholder="Enter the question description"
              multiline
              fullWidth
              variant="outlined"
              className={classes.inputitems}
              onChange={(event) => inputChangeHandler(event, "description")}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={onSubmitHandler}
              disabled={!inputIsValid.title}
              className={classes.postbutton}
            >
              Submit
            </Button>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
