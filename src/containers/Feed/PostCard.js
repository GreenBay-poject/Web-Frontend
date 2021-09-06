import React, { useState, useCallback} from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import Image from 'cloudinary-react';

import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';

import PostCard from '../../components/UI/PostCard';
import { addPost, deletePost, getPosts } from "../../api/feed";
import { checkValidity } from '../../shared/validate';
import { updateObject } from '../../shared/utility';
import { addAlert } from '../../store/actions/index';

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
    root: {
        flexGrow: 1,
        display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
        marginLeft: theme.spacing(8),
        marginRight: theme.spacing(8),
        marginBottom: theme.spacing(8),
    },
    container: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    pagination: {
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
        display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
    },
    button: {
        margin: theme.spacing(8),
    },
    buttonalign: {
        alignItems: 'right',
    },
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
        marginTop: "5px"
    }
}));
const postData=[{"title":"Left Hand Batsman", "user":"Kumar Saqngakkara", "description":"Kioni is just one of several new additions to the OKC Zoo family, which has recently welcomed a rare clouded leopard kitten, three Eastern massasauga snakelets and four black tree monitor hatchlings, as well as two adult bat-eared foxes. Another giraffe calf is expected soon, as well as an Asian elephant calf due in February.Our animal family is always growing, said Candice Rennels, zoo director of public relations. It is very exciting that there are so many right now and that they're all so diverse in species. ... These new births are ambassadors for their species as a whole and are really contributing to the longevity of their populations", "posted_date":"July 2nd 2021", "image_url":"http://wallup.net/wp-content/uploads/2016/01/20264-nature-forest-trees-green.jpg", "user_profile":"https://tse4.mm.bing.net/th?id=OIF.80AzBCd4Wr3ljsbO%2bjqFVQ&pid=Api&P=0&w=300&h=300"}]
const postData2=[{"title":"Right Hand Batsman", "user":"Mahela Jayawardhane", "description":"st one of several new additions to the OKC Zoo family, which has recently welcomed a rare clouded leopard kitten, three Eastern massasauga snakelets and four black tree monitor hatchlings, as well as two adult bat-eared foxes.ected soon, as well as an Asian elephant calf due in February.Our animal family is always growing, said Candice Rennels, zoo director of public relations. It is very exciting that there are so many right now and that they're all so diverse in species. ... These new births are ambassadors for their species as a whole and are really contributing to the longevity of their populations", "posted_date":"July 2nd 2021", "image_url":"https://cdn.pixabay.com/photo/2012/03/01/00/21/bridge-19513__480.jpg", "user_profile":"https://pixabay.com/illustrations/icon-user-male-avatar-business-5359553/"}]
const postData3=[{"title":"Good Captain", "user":"Angelo Mathews", "description":"Kioni is judditions to the OKC Zoo family, which has recently welcomed a rare cloudedtern massaslack tree monitor hatchlings, as well as two adult bat-eared foxes. Another giraffe calf is expected soon, as well as an Asian elephant calf due in February.Our animal family is always growing, said Candice Rennels, zoo director of public relations. It is very exciting that there are so many right now and that they're all so diverse in species. ... These new births are ambassadors for their species as a whole and are really contributing to the longevity of their populations", "posted_date":"July 2nd 2021", "image_url":"https://cdn.pixabay.com/photo/2018/01/12/14/24/night-3078326__340.jpg", "user_profile":"https://tse4.mm.bing.net/th?id=OIF.80AzBCd4Wr3ljsbO%2bjqFVQ&pid=Api&P=0&w=300&h=300"}]
const postData4=[{"title":"Best yorker Bowler", "user":"Lasith Malinga", "description":"eral new additions to the OKC Zoo family, which has recently welcomed a rare clouded leopard kitten, three Eastern massasauga snakelets and four black tree monitor hatchlings, as well as two adult bat-eared foxes. Another giraffe calf is expected soon, as well as an Asian elephant calf due in February.Our animal family is always growing, said Candice Rennels, zoo director of public relations. It is very exciting that there are so many right now and that theyin species. ... These new births are ambassadors for their species as a whole and are really contributing to the longevity of their populations", "posted_date":"July 2nd 2021", "image_url":"https://cdn.pixabay.com/photo/2013/06/09/09/07/explosion-123690__340.jpg", "user_profile":"https://tse1.mm.bing.net/th?id=OIF.Zi9U%2fN3XTHKRoIlXYa6TyA&pid=Api&P=0&w=300&h=300"}]
const postData5=[{"title":"Born Skill", "user":"Aravindada de silva", "description":"Kioni is just one of several new additions to the OKC Zoo family, which has recently welcomed a rare clouded leopard kitten, three Eastern massasauga snakelets and four black tree monitor hatchlings, as well as two adult bat-eared foxes. d soon, as well as an Asian elephant calf due in February.Our animal family is always growing, said Candice Rennels, zoo director of public relations. It is very exciting that there are so many right now and that they're all so diverse in species. ... These new births are ambassadors for their species as a whole and are really contributing to the longevity of their populations", "posted_date":"July 2nd 2021", "image_url":"https://cdn.pixabay.com/photo/2019/09/08/20/54/elephant-4461911__340.jpg", "user_profile":"https://tse3.mm.bing.net/th?id=OIP.aiZsNd4oIfLRAd56W_OpuAHaGL&pid=Api&P=0&w=188&h=158"}]
const postData6=[{"title":"Best all-rounder", "user":"Tilakarathne Dilshan", "description":"family, which has recently welcomed a rare clouded leopard kitten, three Eastern massasauga snakelets and four black tree monitor hatchlings, as well as two adult bat-eared foxes. Another giraffe calf is expected soon, as well as an Asian elephant calf due in February.Our animal family is always growing, said Candice Rennels, zoo director of public relations. It is very exciting that there are so many right now and that they're all so diverse in species. ... These new births are ambassadors for their species as a whole and are really contributing to the longevity of their populations", "posted_date":"July 2nd 2021", "image_url":"https://cdn.pixabay.com/photo/2016/09/27/19/07/forest-1699078__340.jpg", "user_profile":"https://tse4.mm.bing.net/th?id=OIF.80AzBCd4Wr3ljsbO%2bjqFVQ&pid=Api&P=0&w=300&h=300"}]
const postData7=[{"title":"Wownidu!", "user":"Wanidu Hasaranga", "description":"Kioni  is just one of several new additions to the OKC Zoo family, which has recently welcomed a rare clouded leopard kitten, three Eastern massasauga snakelets and four black tree monitor hatchlings, as well as two adult bat-eared foxes. d soon, as well as an Asian elephant calf due in February.Our animal family is always growing, said Candice Rennels, zoo director of public relations. It is very exciting that there are so many right now and that they're all so diverse in species. ... These new birthsand are really contributing to the longevity of their populations", "posted_date":"July 2nd 2021", "image_url":"http://wallup.net/wp-content/uploads/2016/01/20264-nature-forest-trees-green.jpg", "user_profile":"https://pixabay.com/illustrations/icon-user-male-avatar-business-5359553/"}]

function FeedPage(props) {
  const classes = useStyles();
  const { isAuthenticated, email } = props;
  const [page, setPage] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [quillVal, setQuillVal] = React.useState(false); 
//   const [progress, setProgress] = React.useState(0);
  const [imageUrl,setimageUrl] =useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = React.useState('');
  const onSelectFileChanged = (event) => {
  const file = event.target.files[0];
    setFile(file);
  };
  const [value, setValue] = useState('');

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
      console.log("postttttttttttttttttttt")
    const data ={
        "email": email,
        "title": stateObj.title,
        "description": quillVal,
        "image_url": imageUrl,
    }
    console.log(data)
    addPost(data)
        .then((response) => {
        if (!response.error) {
            console.log("successfull")
        } else {
            console.log(response)  
        }
        })
     console.log("hiiii")
  }, []);


  const onChange = (value) => {
    console.log(typeof(value))
    setQuillVal(value)
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

//   const handleOnPause = (prgs) => {
//     setProgress(prgs);
//   };
//   const handleOnRunning = (prgs) => {
//     setProgress(prgs);
//   };

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

//   const onUploadButtonClicked = () => {
//         handleOnPause
//         handleOnRunning
//         handleOnComplete
//   }

  return (
      <React.Fragment>
        <div className={classes.root}>
            <Grid container spacing={3} className={classes.container}>
                <Grid container spacing={3} className={classes.buttonalign}>
                    <Grid item xs>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<CloudUploadIcon />}
                            onClick={handleOpen}
                            hidden={!isAuthenticated}
                        >
                            Upload New Post
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <PostCard data={postData}/>
                    </Grid>
                    <Grid item xs>
                        <PostCard data={postData2}/>
                    </Grid>
                    <Grid item xs>
                        <PostCard data={postData3}/>
                    </Grid>
                    <Grid item xs>
                        <PostCard data={postData4}/>
                    </Grid>
                </Grid>
                <Grid container spacing={3} className={classes.container}>
                    <Grid item xs>
                        <PostCard data={postData5}/>
                    </Grid>
                    <Grid item xs>
                        <PostCard data={postData6}/>
                    </Grid>
                    <Grid item xs>
                        <PostCard data={postData7}/>
                    </Grid>
                </Grid>
                <Grid container spacing={3} className={classes.container}>
                    <Grid item xs>
                        <PostCard data={postData}/>
                    </Grid>
                    <Grid item xs>
                        <PostCard data={postData}/>
                    </Grid>
                    <Grid item xs>
                        <PostCard data={postData}/>
                    </Grid>
                    <Grid item xs>
                        <PostCard data={postData}/>
                    </Grid>
                </Grid>
            </Grid>
        </div>
        <div className={classes.pagination}>
            <Typography>Page: {page}</Typography>
            <Pagination count={10} page={page} onChange={handleChange} />
        </div>
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
                    color="primary"
                    fullWidth
                    onClick={onSubmitHandler()}
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
