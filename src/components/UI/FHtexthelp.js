import React from 'react';
import TextField from '@material-ui/core/TextField';

const FHTextField = (props) => {
    return (
        <TextField
            fullWidth={props.fullWidth}
            onChange={props.inputChangeHandler}
            error={props.hasErr}
            className={props.componentClass}
            helperText={props.hasErr ? props.errStr : ''}
            label={props.label}
            type={props.type}
            variant="outlined"
            autoComplete={props.autoComplete} />
    );
}

export default FHTextField;