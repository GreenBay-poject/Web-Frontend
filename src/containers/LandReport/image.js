import React, { useCallback, useState , useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import backgroundimage from '../UserProfile/images/signuppage.jpg';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

import { getImage, addNote } from "../../api/landpage";
import { addAlert } from '../../store/actions/index';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  large: {
    width: "700px",
    height: "500px",
    objectFit: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
  },
}));

export default function SimplePaper(props) {
  const classes = useStyles();
  const { selectedDate, latitude, longitude, setReportData } =props
  const [image, Setimage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data ={
      "lat": latitude,
      "lon": longitude,
      "date": selectedDate,
    }
    if (isLoading ) {
      getImage()
        .then((response) => {
          if (!response.error) {
            console.log(response.data)
            Setimage(response.data)
          } else {
              addAlert("Error on loading Private Notes")
          }
        })
    }
}, [isLoading]);

  const onSubmitHandler = useCallback(() => {
    const data ={
      "url": image,
    }
    addNote()
        .then((response) => {
          if (!response.error) {
            console.log(response.data)
            setReportData(response.data)
          } else {
              addAlert("Error on loading Private Notes")
          }
        })
  }, []);

  return (
    <div className={classes.root}>
        <img alt="pp" className={classes.large} src={image}/>
        <Grid container spacing={3}>
                <Grid item xs={12} sm={12} className={classes.button}>
                    <ButtonGroup color="primary" aria-label="outlined primary button group" onClick={onSubmitHandler}>
                        <Button>Get the Report</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
    </div>
  );
}
