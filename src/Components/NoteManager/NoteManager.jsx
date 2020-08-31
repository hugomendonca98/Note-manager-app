import React, { useContext, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

import theme from "../Theme/MaterialUiColor/UiColor";
import {
  GrayColor,
  WhiteColor,
  RedColor,
  GreenColor,
  YellowColor,
} from "../Theme/Colors";
import TextArea from "../TextArea/TextArea";
import H2 from "../Theme/Typography/h2";
import Select from "../Select/Select";
import Button from "../Theme/Button/Button";
import { NotesContext } from "../../Contexts/NotesContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  align: {
    border: `solid 1px ${GrayColor}`,
    padding: "20px",
    backgroundColor: WhiteColor,
    [theme.breakpoints.down("md")]: {
      marginTop: 30,
    },
  },
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  close: {
    cursor: "pointer",
  },
}));

export default function StateTextFields({ titleForm }) {
  const classes = useStyles();
  const {
    handleSendNote,
    oldNote,
    sendEditNote,
    setOldNote,
    initialState,
    setInitialState,
    setOpenNotes,
    setOpenEdit,
  } = useContext(NotesContext);

  // recuperando os valores da nota para assim realizar a edição da mesma.
  useEffect(() => {
    if (oldNote)
      setInitialState({
        ...initialState,
        title: oldNote.title,
        content: oldNote.content,
        color: oldNote.color,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oldNote]);

  const handleChangeColor = (event) => {
    setInitialState({ ...initialState, color: event.target.value });
  };

  const handleChangeTitle = (event) => {
    setInitialState({ ...initialState, title: event.target.value });
  };

  const handleChangeContent = (event) => {
    setInitialState({ ...initialState, content: event.target.value });
  };

  function handleClose() {
    setOpenNotes(false);
    setOpenEdit(false);
  }

  async function handleSetFormValues() {
    if (oldNote.noteId !== "") {
      sendEditNote({
        title: initialState.title,
        content: initialState.content,
        color: initialState.color,
      });
      setOldNote({
        noteId: "",
        title: "",
        content: "",
        color: "",
      });
    } else {
      await handleSendNote({
        title: initialState.title,
        content: initialState.content,
        color: initialState.color,
      });
    }
    setInitialState({ ...initialState, title: "", content: "", color: "" });
  }

  const selectItems = [
    { value: "red", name: "Vermelho", style: { background: RedColor } },
    { value: "green", name: "Verde", style: { background: GreenColor } },
    { value: "yellow", name: "Amarelo", style: { background: YellowColor } },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" className={classes.align}>
        <div className={classes.flex}>
          <H2 content={titleForm} />
          <CloseIcon className={classes.close} onClick={handleClose} />
        </div>
        <TextArea
          label="Titulo"
          id="title-form"
          onChange={handleChangeTitle}
          value={initialState.title}
        />
        <TextArea
          label="Conteudo"
          id="content-form"
          onChange={handleChangeContent}
          value={initialState.content}
          multiline
          rows={3}
        />
        <Select
          value={initialState.color}
          onChange={handleChangeColor}
          items={selectItems}
          span={true}
        />
        <Button
          content={titleForm}
          color="primary"
          onClick={handleSetFormValues}
        />
      </Container>
    </ThemeProvider>
  );
}
