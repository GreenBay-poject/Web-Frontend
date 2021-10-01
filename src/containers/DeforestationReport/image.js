import React, { useCallback, useState , useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getImage, getDeforestationReport } from "../../api/landpage";
import { addAlert } from '../../store/actions/index';
import ReportModal from "../DeforestationReport/reportModal";

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
  griditems: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  large: {
    width: "300px",
    height: "300px",
    objectFit: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
  },
}));

export default function SimplePaper(props) {
  const classes = useStyles();
  const { selectedDate, selectedDate2, latitude, longitude, setReportData } =props
  const [image, Setimage] = useState("");
  const [image2, Setimage2] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [reportdetails, SetReportDetails] = useState();

  useEffect(() => {
    const data ={
      "lat": latitude,
      "lon": longitude,
      "date": selectedDate,
    }
    if (isLoading ) {
      getImage(data)
        .then((response) => {
          if (!response.error) {
            console.log(response.data.Image.Url)
            Setimage(response.data.Image.Url)
          } else {
              addAlert("Error on loading Private Notes")
          }
        });

      const data2 ={
        "lat": latitude,
        "lon": longitude,
        "date": selectedDate2,
      }

      getImage(data2)
        .then((response) => {
          if (!response.error) {
            console.log(response.data.Image.Url)
            Setimage2(response.data.Image.Url)
          } else {
              addAlert("Error on loading Private Notes")
          }
        }).finally(() => setIsLoading(false));
    }
  }, [isLoading, latitude, longitude, selectedDate, selectedDate2]);

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitHandler = useCallback(() => {
    const data ={
      "url_1": image,
      "url_2": image2,
    }
    getDeforestationReport(data)
        .then((response) => {
          if (!response.error) {
            SetReportDetails(response.data)
            setReportData(response.data)
          } else {
              addAlert("Error on loading Private Notes")
          }
        })
    setOpen(true);
  }, [image, image2, setReportData]);
  console.log(image)
  if (isLoading){
    return(
      <CircularProgress/>
    )
  } else{
    return (
      <div>
          <Grid container className={classes.griditems}>
                  <Grid item xs={12} sm={6} className={classes.image}>
                      <img alt="pp" className={classes.large} src={image}/>
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.image}>
                      <img alt="pp" className={classes.large} src={image2}/>
                  </Grid>
                  <Grid item xs={12} sm={12} className={classes.button}>
                      <ButtonGroup color="primary" aria-label="outlined primary button group" onClick={onSubmitHandler}>
                          <Button id="getthereportbtn">Get the Report</Button>
                      </ButtonGroup>
                  </Grid>
          </Grid>
          <ReportModal
              open={open}
              handleClose={handleClose}
              latitude={latitude}
              longitude={longitude}
              selectedDate={selectedDate}
              selectedDate2={selectedDate2}
              image={image}
              reportdetails={reportdetails}
          />
      </div>
    );
  }
}
