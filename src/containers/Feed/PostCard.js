import React from 'react';

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
}));
const postData=[{"title":"Deforestation pattern 1", "user":"IsuruAriyarathne1", "description":"description1", "posted_date":"July 2nd 2021", "image_url":"http://wallup.net/wp-content/uploads/2016/01/20264-nature-forest-trees-green.jpg", "user_profile":"https://pixabay.com/illustrations/icon-user-male-avatar-business-5359553/"}]

export default function MediaCard() {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const [open, setOpen] = React.useState(false);
//   const [quillVal, setQuillVal] = React.useState(false); //for later usage
  const [setQuillVal] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);
//   const [file, setFile] = React.useState('');   //for later usage
  const [setFile] = React.useState('');
  const onSelectFileChanged = (event) => {
  const file = event.target.files[0];
    setFile(file);
  };

  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);


  const onChange = (event) => {
    setQuillVal(event.target.value)
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
                        <PostCard data={postData}/>
                    </Grid>
                    <Grid item xs>
                        <PostCard data={postData}/>
                    </Grid>
                    <Grid item xs>
                        <PostCard data={postData}/>
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
                <h2 id="transition-modal-title">Add new post</h2>
                <TextField
                    id="outlined-textarea"
                    label="Title"
                    placeholder="Enter the post title"
                    multiline
                    fullWidth
                    variant="outlined"
                />
                <div className={classes.progressBar}>
                    <LinearProgress vvariant="buffer" value={progress} valueBuffer={buffer}/>
                </div>
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
                    // onClick={}
                    // disabled={file === ''}
                >
                    Upload
                </Button>
                <ReactQuill onChange={onChange} />
            </div>
            </Fade>
        </Modal>
      </React.Fragment>
  );
}
