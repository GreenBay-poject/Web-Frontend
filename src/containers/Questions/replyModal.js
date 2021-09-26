import React, { useState, useCallback} from 'react';
//import Axios from 'axios';
//import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Box, Button, TextField } from '@material-ui/core';

import { checkValidity } from '../../shared/validate';
import { updateObject } from '../../shared/utility';
import { answerQuestion } from "../../api/question";

const inputDefinitions = {

  description: {
      validations: {
          // required: false,
          minLength: 20,
          //maxLength: 40,
          validationErrStr: 'Use more than 20 characters for your reply',
      }
  },
};

const useStyles = makeStyles((theme) => ({
  modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflowY: 'scroll',
  },
  modelpaper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: 400,
  },
  progressBar: {
      width: '100%',
  },
  inputitems: {
      padding: theme.spacing(0, 0, 2),
  },
  postbutton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "5px",
    backgroundColor:"#80bf50",
    "&:hover": {
      backgroundColor: "#439922",
      transform: "scale(1.01)",
}
}
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const { email, open, handleClose,q_idForReply,isAuthenticated } = props;
  //const [quillVal, setQuillVal] = React.useState(false); 


  const [inputIsValid, setInputIsValid] = useState({
    description: true,
  });

  const [stateObj, setStateObj] = useState({
    description: '',
  });

  const inputChangeHandler = useCallback((event, inputId) => {
    let validationConst = inputDefinitions[inputId].validations;
    let isValid = checkValidity(validationConst, event.target.value);
    setInputIsValid(updateObject(inputIsValid, { [inputId]: isValid }));
    setStateObj(updateObject(stateObj, { [inputId]: event.target.value }))
  }, [stateObj, inputIsValid]);

  const onSubmitHandler = useCallback((event) => {
    const data ={
        "email": email,
        "description": stateObj.description,
        "q_id":q_idForReply
    }
    if (isAuthenticated){
      answerQuestion(data)
      .then((response) => {
          if (!response.error) {
              console.log("successfull")
          } else {
              console.log(response)  
          }
      })
  }
  }, [email, stateObj.description,q_idForReply]);

 /* const onChange = (value) => {
    console.log(typeof(value))
    setQuillVal(value)
  }*/

return (
  <React.Fragment>       
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
      <Fade in={open}>
            <div className={classes.modelpaper}>
                <h2 id="transition-modal-title" className={classes.inputitems}>Add Reply</h2>
              
                <TextField
                    id="outlined-textarea"
                    label="Reply"
                    rows="10"
                    placeholder="Enter the Reply description"
                    multiline
                    fullWidth
                    variant="outlined"
                    className={classes.inputitems}
                    onChange={(event) => inputChangeHandler(event, "description")}
                />
                <Box color="red">{!inputIsValid.description? inputDefinitions.description.validations.validationErrStr:null}</Box>

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={onSubmitHandler}
                    disabled={!inputIsValid.description}
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