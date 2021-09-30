import React, { useCallback, useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getImage, getReport } from "../../api/landpage";
import { addAlert } from "../../store/actions/index";
import ReportModal from "../LandReport/reportModal";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  large: {
    width: "700px",
    height: "500px",
    objectFit: "cover",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
  },
  button1: {
    color:'white',
    backgroundColor: "rgb(0, 121, 107)",
    "&:hover": {
      backgroundColor: "#05574F",
    },
  },
}));

export default function SimplePaper(props) {
  const classes = useStyles();
  const { selectedDate, latitude, longitude, setReportData } = props;
  const [image, Setimage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [reportdetails, SetReportDetails] = useState();

  useEffect(() => {
    const data = {
      lat: latitude,
      lon: longitude,
      date: selectedDate,
    };
    if (isLoading) {
      getImage(data)
        .then((response) => {
          if (!response.error) {
            console.log(response.data.Image.Url);
            Setimage(response.data.Image.Url);
          } else {
            addAlert("Error on loading Private Notes");
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [isLoading, latitude, longitude, selectedDate]);

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitHandler = useCallback(() => {
    const data = {
      url: image,
    };
    getReport(data).then((response) => {
      if (!response.error) {
        SetReportDetails(response.data);
        setReportData(response.data);
      } else {
        addAlert("Error on loading Private Notes");
      }
    });
    setOpen(true);
  }, [image, setReportData]);
  console.log(image);
  if (isLoading) {
    return <CircularProgress />;
  } else {
    return (
      <div className={classes.root}>
        <img alt="pp" className={classes.large} src={image} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} className={classes.button}>
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
              onClick={onSubmitHandler}
            >
              <Button className={classes.button1}>Get the Report</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        <ReportModal
          open={open}
          handleClose={handleClose}
          latitude={latitude}
          longitude={longitude}
          selectedDate={selectedDate}
          image={image}
          reportdetails={reportdetails}
        />
      </div>
    );
  }
}
