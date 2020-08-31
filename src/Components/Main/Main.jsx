import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import NoteManager from "../NoteManager/NoteManager";
import { NotesContext } from "../../Contexts/NotesContext";
import "../Theme/animation.css";
import Routes from "../../Global/Routes/Routes";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  styledNotes: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(0),
      paddingTop: 30,
      width: "auto",
      justifyContent: "center",
    },
  },
}));

export default function Main() {
  const classes = useStyles();

  const { openNotes, openEdit } = useContext(NotesContext);

  return (
    <>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {openNotes === null ? null : (
          <div className={openNotes || openEdit ? "start" : "end"}>
            <NoteManager
              titleForm={
                openEdit ? "Editar Nota" : openNotes ? "Criar Nova Nota" : ""
              }
            />
          </div>
        )}
        <div className={classes.styledNotes}>
          <Routes />
        </div>
      </main>
    </>
  );
}

