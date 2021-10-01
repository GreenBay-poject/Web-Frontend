import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Map from "../LandReport/map";
import Dateselection from "../LandReport/selectdate";
import ImageSlections from "../LandReport/image";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  button1: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: "rgb(0, 121, 107)",
    color: "white",
    "&:hover": {
      backgroundColor: "#05574F",
      transform: "scale(1.01)",
    },
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  animatedHeader: {
    fontSize: "50px",
  }
}));

function getSteps() {
  return ['Select location', 'Select Date', 'Get the report'];
}

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [latitude, setLatitude] = useState(7.2842);
  const [longitude, setLongitude] = useState(80.6372);
  const [reportData, setReportData] = useState([]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  console.log(reportData)
  console.log(selectedDate)
  console.log(reportData)
  

  return (
    <div className={classes.root}>
      {/* <animated.div style={useSpring({
          loop: true,
          to: [
            { opacity: 1, color: '#7CB342' },
            { opacity: 0, color: 'rgb(197, 225, 165)' },
          ],
          from: { opacity: 0, color: 'red' },
        })} className={classes.animatedHeader}>You Are Ready to Get the Report</animated.div> */}
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {index===0 ? <Map setDates={setDates} setLatitude={setLatitude} setLongitude={setLongitude} latitude={latitude} longitude={longitude}/>: null}
              {index===1 ? <Dateselection dates={dates} setSelectedDate={setSelectedDate}/>: null}
              {index===2 ? <ImageSlections selectedDate={selectedDate} latitude={latitude} longitude={longitude} setReportData={setReportData}/>: null}
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    className={classes.button1}
                    disabled={dates.length===0}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}
