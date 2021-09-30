import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 375,
    marginTop: "10px",
  },
  linkstyle: {
    textDecoration: "none",
  },
  button1: {
    color: "#00796B",
  },
});

export default function ImgMediaCard(props) {
  const { isAuthenticated } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Tracker"
          height="140"
          image={props.Details.image}
          title="Tracker"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.Details.Title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.Details.Description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link
          className={classes.linkstyle}
          to={
            props.Details.Name === "Notes"
              ? "/notespage"
              : props.Details.Name === "Q&A" && isAuthenticated
              ? "/questions"
              : props.Details.Name === "Q&A" && isAuthenticated
              ? "/signin"
              : "/feedpage"
          }
        >
          <Button size="small" className={classes.button1}>
            Explore {props.Details.Name}
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
