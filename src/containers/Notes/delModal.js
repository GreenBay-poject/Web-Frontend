import React from "react";
//import Axios from 'axios';
//import { connect } from 'react-redux';

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";

import Fade from "@material-ui/core/Fade";
import { Box, Button, Grid } from "@material-ui/core";

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
    height:150
  },
  progressBar: {
    width: "100%",
  },
  inputitems: {
    padding: theme.spacing(0, 0, 2),
  },
  postbutton: {
    color:"white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "25px",
    marginLeft:"35px",
    backgroundColor: "#00796B",
    "&:hover": {
      backgroundColor: "#05574F",
      transform: "scale(1.01)",
    },
  },
  postbutton2: {
    color:"white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "25px",
    marginLeft:"35px",
    backgroundColor: "#851132",
    "&:hover": {
      backgroundColor: "#630b24",
      transform: "scale(1.01)",
    },
  },
}));

export default function DeleteModel(props) {
  const classes = useStyles();
  const {open ,handleClose, handleDelete } = props;

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
            <Box>
              <Box fontSize="20px" align="center"><b>Delete Question?</b></Box>
              <Grid container direction="row">
                <Grid item xs>
                  <Button className={classes.postbutton2} class="noteyesbtn" onClick={handleDelete}>Yes</Button>
                </Grid>
                <Grid item xs>
                  <Button className={classes.postbutton} class="notenobtn" onClick={handleClose}>No</Button>
                </Grid> 
              </Grid>
            </Box>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
