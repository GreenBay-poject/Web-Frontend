import React from 'react';
import TextField from '@material-ui/core/TextField';
import {
    alpha,
    ThemeProvider,
    withStyles,
    makeStyles,
    createTheme,
  } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));
const theme = createTheme({
    palette: {
      primary: green,
    },
});

const FHTextField = (props) => {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <TextField
            fullWidth={props.fullWidth}
            onChange={props.inputChangeHandler}
            error={props.hasErr}
            className={props.componentClass}
            helperText={props.hasErr ? props.errStr : ''}
            label={props.label}
            type={props.type}
            variant="outlined"
            id="mui-theme-provider-outlined-input"
            autoComplete={props.autoComplete} />
        </ThemeProvider>
    );
}

export default FHTextField;