import React from 'react';
import TextField from '@material-ui/core/TextField';
import {
    ThemeProvider,
    createTheme,
  } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const theme = createTheme({
    palette: {
      primary: green,
    },
});

const FHTextField = (props) => {
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