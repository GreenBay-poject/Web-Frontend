import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function ControlledOpenSelect(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const {dates, setSelectedDate, setSelectedDate2} = props;
  const [ date, setDate] = React.useState();
  const [ date2, setDate2] = React.useState();
  

  const handleChange = (event) => {
    setSelectedDate(event.target.value);
    setDate(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange2 = (event) => {
    setSelectedDate2(event.target.value);
    setDate2(event.target.value);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  if(dates){
    return(
      <div>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">Starting Date</InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={date}
                    onChange={handleChange}
                  >
                    {/* <MenuItem value="">
                      <em>None</em>
                    </MenuItem> */}
                    {(dates.All_Dates_Available).map((date) => {
                        return(
                          <MenuItem value={date}>{date}</MenuItem>
                        )
                    }
                    )}
                    {/* <MenuItem value={"2019-01-16"}>{dates.All_Dates_Available[0]}</MenuItem> */}
                    {/* <MenuItem value={"2019-01-16"}>2019-01-16</MenuItem> */}
                  </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">Ending Date</InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open2}
                    onClose={handleClose2}
                    onOpen={handleOpen2}
                    value={date2}
                    onChange={handleChange2}
                  >
                    {/* <MenuItem value="">
                      <em>None</em>
                    </MenuItem> */}
                    {(dates.All_Dates_Available).map((date) => {
                        return(
                          <MenuItem value={date}>{date}</MenuItem>
                        )
                    }
                    )}
                    {/* <MenuItem value={"2019-01-16"}>{dates.All_Dates_Available[0]}</MenuItem> */}
                    {/* <MenuItem value={"2019-01-16"}>2019-01-16</MenuItem> */}
                  </Select>
                </FormControl>
            </Grid>
        </Grid>
      </div>
    )
  } else{
    <CircularProgress/>
  }
}
