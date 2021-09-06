import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  description: {
      height: "400px"
  }
});

export default function PostCard(props) {
    const classes = useStyles();
    const {data} = props;
    console.log(data)
    return (
        <Card className={classes.root}>
        <CardActionArea>
            <CardMedia
                className={classes.media}
                image= {data[0].image_url}
                title="Contemplative Reptile"
            />
             <List className={classes.root}>
                <ListItem>
                    <ListItemAvatar>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                </ListItem>
             </List>
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {data[0].title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p"  className={classes.description}>
                {data[0].description}
            </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" color="secondary">
                Delete
            </Button>
        </CardActions>
        </Card>
    );
}
