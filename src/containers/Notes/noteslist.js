import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '95%',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300
  },
  listcolor: {
    backgroundColor: "#F2F39F",
    margin: "10px",
    borderRadius: "20px"
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  inline: {
    display: 'inline',
  },
  chip: {
    color: "rgb(0, 121, 107)",
  }
}));

export default function PublicNotes(props) {
  const classes = useStyles();
  const { publicNotes } = props;

  let roundOff = (num, places) => {
    const x = Math.pow(10,places);
    return Math.round(num * x) / x;
  }

  return (
    <List className={classes.root}>
      {
          publicNotes.map((author) => 
            author.notes.map((note) => 
            <>
              <ListItem alignItems="flex-start" className={classes.listcolor}>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={author.ministry_name}
                  secondary={
                    <React.Fragment>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={12}>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {note.text}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Chip className={classes.chip} variant="outlined"  label={roundOff(note.lat, 2)} />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                        <Chip className={classes.chip} variant="outlined"  label={roundOff(note.lon, 2)} />
                        </Grid>
                      </Grid>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          ))}
    </List>
  );
}
