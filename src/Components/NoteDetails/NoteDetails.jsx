import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import Api from "../../Global/Api";
import { RedColor, GreenColor, YellowColor } from "../Theme/Colors";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "60%",
    minWidth: "60%",
    margin: "auto",
    marginTop: 100,
    [theme.breakpoints.down("sm")]: {
      marginTop: 130,
    },
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 20,
  },
  content: {
    fontSize: 17,
  },
  date: {
    fontSize: 14,
    marginLeft: 14,
    marginTop: 10,
    marginBottom: 5,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function OutlinedCard(props) {
  const classes = useStyles();
  const [parents, setParents] = useState(false);

  useEffect(() => {
    async function getNote() {
      try {
        const { id } = props.match.params;
        const response = await Api.get(`/notes/${id}`);
        setParents(response.data);
      } catch (event) {
        console.error("Erro ao buscar Nota!", event);
      }
    }
    getNote();
  }, [props.match.params]);

  return (
    <>
      {!parents
        ? null
        : [parents].map((note) => (
            <Card
              className={`${classes.root} scale-up-center`}
              variant="outlined"
              key={note._id}
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
              <CardActions>
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Button size="small" className={classes.btnBack}>
                    <ArrowBackIosIcon /> Voltar Para Notas
                  </Button>
                </Link>
              </CardActions>
              <Typography
                className={classes.date}
                color="textSecondary"
                gutterBottom
              >
                {note.createdAt
                  ? format(new Date(note.createdAt), "dd/MM/yyyy HH:mm", {
                      timeZone: "America/Sao_Paulo",
                    })
                  : null}
              </Typography>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {note.title}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  className={classes.content}
                >
                  {note.content}
                </Typography>
              </CardContent>
            </Card>
          ))}
    </>
  );
}
