import React, { useState, useCallback} from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';

import { checkValidity } from '../../shared/validate';
import { updateObject } from '../../shared/utility';
import { addAlert } from '../../store/actions/index';
import { addPost  } from '../../api/feed';

const inputDefinitions = {
    title: {
        validations: {
            required: true,
            minLength: 2,
            maxLength: 40,
            validationErrStr: 'Use between 6 and 40 characters for your password',
        }
    },
    description: {
        validations: {
            // required: false,
            // minLength: 2,
            // maxLength: 40,
            validationErrStr: 'Use between 6 and 40 characters for your password',
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
        backgroundColor: "rgb(0, 121, 107)",
    }
}));

function FeedPage(props) {
  const classes = useStyles();
  const { open, handleClose, email, isAuthorized, isAuthenticated } = props;
  const [quillVal, setQuillVal] = React.useState(false); 
  const [imageUrl,setimageUrl] =useState("");
  const [file, setFile] = React.useState('');
  const onSelectFileChanged = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const [inputIsValid, setInputIsValid] = useState({
    title: true,
    description: true,
  });

  const [stateObj, setStateObj] = useState({
    title: '',
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
        "title": stateObj.title,
        "description": quillVal.substring(3,quillVal.length-4),
        "image_url": imageUrl
    }
    console.log(data)
    if (isAuthenticated && isAuthorized){
        addPost(data)
        .then((response) => {
            if (!response.error) {
                console.log("successfull")
            } else {
                console.log(response)  
            }
        })
    }
  }, [email, imageUrl, quillVal, stateObj.title, isAuthenticated, isAuthorized]);

  const onChange = (value) => {
    console.log(typeof(value))
    setQuillVal(value)
  }

  const handleOnComplete = () => {
    var FormData = require('form-data');
    return new Promise((resolve, reject) => {
        console.log("hiiiii")
        var formdata =new FormData();
        formdata.append('file', file);
        formdata.append('upload_preset','x66yntbe');
        // const cloudinaryURL ="https://api.cloudinary.com/v1_1/isuruieee/image/upload";
        Axios.post(
        "https://api.cloudinary.com/v1_1/isuruieee/image/upload",
        formdata
        ).then((response) => {
        setimageUrl(response.data.url)
        console.log(response.data.url)
        console.log(imageUrl)
        })
        .catch((error) => {
        console.log(error)
        })
    })
  };

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
                <h2 id="transition-modal-title" className={classes.inputitems}>Add new post</h2>
                <h4 id="transition-modal-title">Title</h4>
                <TextField
                    id="outlined-textarea"
                    label="Title"
                    placeholder="Enter the post title"
                    multiline
                    fullWidth
                    variant="outlined"
                    className={classes.inputitems}
                    onChange={(event) => inputChangeHandler(event, "title")}
                />
                <h4 id="transition-modal-title">Upload Image</h4>
                {/* <div className={classes.progressBar}>
                    <LinearProgress variant="determinate" value={progress} valueBuffer={buffer}/>
                </div> */}
                <input
                    style={{
                        margin: '0px 10px 10px 0px',
                        backgroundColor: '#c7ece3',
                    }}
                    type="file"
                    onChange={onSelectFileChanged}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOnComplete}
                    disabled={file === ''}
                >
                    Upload
                </Button>
                <h4 id="transition-modal-title">Add Description</h4>
                <ReactQuill value={quillVal} onChange={onChange}/>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => onSubmitHandler()}
                    disabled={!inputIsValid}
                    className={classes.postbutton}
                >
                    Post
                </Button>
            </div>
            </Fade>
        </Modal>
      </React.Fragment>
  );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token != null,
        isAuthorized: state.auth.IsAuthorized,
        error: state.auth.error,
        email: state.auth.email
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        addAlert: (alert) => dispatch(addAlert(alert))
    }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
