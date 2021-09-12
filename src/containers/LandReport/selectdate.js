import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { getDates } from "../../api/landpage";

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
  const {dates, setSelectedDate} = props;
  const [ date, setDate] = React.useState();
  

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

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Date</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={date}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {/* {dates.map((date) => {
            <MenuItem value={10}>{date}</MenuItem>
          }
          )} */}
          <MenuItem value={"2019-01-16"}>2019-01-16</MenuItem>
          <MenuItem value={"2019-01-16"}>2019-01-16</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
