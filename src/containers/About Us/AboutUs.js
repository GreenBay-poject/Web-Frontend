import React, { useState, useCallback } from "react";
import { connect } from "react-redux";

//import { toast } from "react-toastify";
import { Button, Box, makeStyles, TextField, Grid } from "@material-ui/core";
import Footer from "../../components/UI/footer";

import { addAlert } from "../../../src/store/actions/index";
import { auth } from "../../../src/store/actions/index";
import { checkValidity } from "../../shared/validate";
import { updateObject } from "../../shared/utility";

const inputDefinitions = {
  Email: {
    validations: {
      // required: false,
      minLength: 20,
      //maxLength: 40,
      validationErrStr: "Use more than 20 characters for your reply",
    },
  },
};
const useStyles = makeStyles((theme) => ({
  Griditem: {
    paddingRight: "10px",
  },
  Griditem2: {
    paddingRight: "40px",
  },
  postbutton1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "5px",
    backgroundColor:"#00796B",
    width:"150px",
    "&:hover": {
      backgroundColor: "#05574F",
      transform: "scale(1.01)",
}
},
  postbutton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 0,
    height: "90px",
    backgroundColor: "#00796B",
    color: "white",
    "&:hover": {
      backgroundColor: "#D19829",
      transform: "scale(1.01)",
    },
  },
  postbutton2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 0,
    color: "white",
    height: "90px",
    backgroundColor: "#D19829",
    transform: "scale(1.01)",
    "&:hover": {
      backgroundColor: "#D19829",
      transform: "scale(1.01)",
    },
  },
  inputitems: {width:"50%",
  paddingRight:"25px"

},
}));

function Aboutus(props) {
  const { isAuthenticated } = props;
  //const {  email } = props;
  const classes = useStyles();

  const [imgURL, setImgURL] = useState("A.jpg");
  const [Barnumber, setBarnumber] = useState(1);

  const [inputIsValid, setInputIsValid] = useState({
    Email: true,
  });

  const [stateObj, setStateObj] = useState({
    Email: "",
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

  //const onSubmitHandler = useCallback((event) => {});

  return (
    <Box fontSize="lg">
      <Grid container direction="row">
        <Grid item className={classes.Griditem2} xs={2} sm={3} align="left">
          <img src="/Logo96.png" alt="logo" />
        </Grid>
        <Grid item className={classes.Griditem} xs={5} sm={2} pt="25px">
          <Button
            onClick={() => {
              setBarnumber(1);
              setImgURL("A.jpg");
            }}
            className={
              Barnumber === 1 ? classes.postbutton2 : classes.postbutton
            }
          >
            Who We Are
          </Button>
        </Grid>
        <Grid item className={classes.Griditem} xs={5} sm={2} pt="25px">
          <Button
            onClick={() => {
              setBarnumber(2);
              setImgURL("B.jpg");
            }}
            className={
              Barnumber === 2 ? classes.postbutton2 : classes.postbutton
            }
          >
            Why Greenbay
          </Button>
        </Grid>
        <Grid item className={classes.Griditem} xs={6} sm={2} pt="25px">
          <Button
            onClick={() => {
              setBarnumber(3);
              setImgURL("C.jpg");
            }}
            className={
              Barnumber === 3 ? classes.postbutton2 : classes.postbutton
            }
          >
            System Guide
          </Button>
        </Grid>
        <Grid item className={classes.Griditem} xs={6} sm={2} pt="25px">
          <Button
            onClick={() => {
              setBarnumber(4);
              setImgURL("D.jpg");
            }}
            className={
              Barnumber === 4 ? classes.postbutton2 : classes.postbutton
            }
          >
            Want to Contact?
          </Button>
        </Grid>
        <img src={imgURL} width="100%" alt="designph" />
        {Barnumber === 4 && isAuthenticated ? (
          <Grid container direction="row">
            <TextField
              id="outlined-textarea"
              label="Email Body"
              rows="1"
              placeholder="Enter the Email Body"
              multiline
              variant="outlined"
              className={classes.inputitems}
              onChange={(event) => inputChangeHandler(event, "Email")}
            />
            <Box color="red">
              {!inputIsValid.Email
                ? inputDefinitions.Email.validations.validationErrStr
                : null}
            </Box>
            <Button
              variant="contained"
              color="primary"
 //             onClick={onSubmitHandler}
              disabled={!inputIsValid.Email}
              className={classes.postbutton1}
            >
              Send
            </Button>
          </Grid>
        ) : null}
      </Grid>

      <Footer></Footer>
    </Box>
  );
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token != null,
    email: state.auth.email,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (gmail, password) => dispatch(auth(gmail, password)),
    addAlert: (alert) => dispatch(addAlert(alert)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Aboutus);
