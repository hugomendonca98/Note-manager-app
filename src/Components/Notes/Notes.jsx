import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { format } from "date-fns";

import { NotesContext } from "../../Contexts/NotesContext";
import { RedColor, GreenColor, YellowColor } from "../Theme/Colors";
import MoreMenu from "../MoreMenu/More";

const useStyles = makeStyles({
  root: {
    minWidth: 300,
    maxWidth: 300,
    minHeight: 150,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  date: {
    fontSize: 14,
  },
  title: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    marginBottom: "10px",
  },
  pos: {
    marginBottom: 12,
  },
  MarginNotes: {
    margin: "10px",
  },
  textContinue: {
    display: "-webkit-box",
    maxWidth: "100%",
    height: "53px",
    margin: "0 auto",
    fontSize: "14px",
    lineHeight: 1.3,
    lineClamp: 3,
    boxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  flexEnd: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default function OutlinedCard() {
  const classes = useStyles();

  const { apiLoaded } = useContext(NotesContext);

  return [...apiLoaded].map((note) => (
      <div className={classes.MarginNotes} key={note._id}>
        <Card
          className={`${classes.root} scale-up-center`}
          variant="outlined"
          style={{
            backgroundColor:
              note.color === "red"
                ? RedColor
                : note.color === "green"
                ? GreenColor
                : note.color === "yellow"
                ? YellowColor
                : "white",
          }}
        >
          <CardContent>
            <Typography
              className={classes.date}
              color="textSecondary"
              gutterBottom
            >
              {format(new Date(note.createdAt), "dd/MM/yyyy HH:mm", {
                timeZone: "America/Sao_Paulo",
              })}
            </Typography>
            <Typography variant="h5" component="h2" className={classes.title}>
              {note.title}
            </Typography>
            <p className={classes.textContinue}>
              {note.content}
              <br />
            </p>
          </CardContent>
          <CardActions className={classes.flexEnd}>
            <MoreMenu note={note} />
          </CardActions>
        </Card>
      </div>
  ));
}
