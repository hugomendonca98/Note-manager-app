import React, { useContext, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import { Checkbox } from "@material-ui/core";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

import Tooltip from "../Theme/Tooltip/Tooltip";
import { NotesContext } from "../../Contexts/NotesContext";
import Api from "../../Global/Api";
import { PrimaryColor } from "../Theme/Colors";

export default function SimpleMenu({ note }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const {
    handleRemoveNote,
    setOpenEdit,
    setOldNote,
    setOpenNotes,
    baseURL,
  } = useContext(NotesContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  async function handleEditNote(note) {
    await setOldNote({
      noteId: note._id,
      title: note.title,
      content: note.content,
      color: note.color,
    });
    handleClose();
    setOpenEdit(true);
    setOpenNotes(false);
  }

  const [markerState, setMarkerState] = useState("");

  async function getNoteMarker(note) {
    const response = await Api.get(`/notes/${note._id}`);
    setMarkerState(response.data.marker);
  }

  useEffect(() => {
    getNoteMarker(note);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleImportant(note) {
    getNoteMarker(note);
    const markerToggle = markerState === "true" ? "false" : "true";
    await Api.put(`/notes/${note._id}`, {
      _id: note._id,
      title: note.title,
      content: note.content,
      color: note.color,
      marker: markerToggle,
    });
    setMarkerState(markerToggle);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title="Opções">
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </Button>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link
          to={`/note/${note._id}`}
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={() => handleClose()}
        >
          <MenuItem>Visualizar</MenuItem>
        </Link>
        <MenuItem onClick={() => handleEditNote(note)}>Editar</MenuItem>
        <MenuItem onClick={() => handleImportant(note)}>
          Importante
          <Checkbox
            color={PrimaryColor}
            checked={markerState === "true" ? true : false}
          />
        </MenuItem>
        <MenuItem onClick={() => handleRemoveNote(note._id)}>Apagar</MenuItem>
        <MenuItem>
          <FacebookShareButton
            url={`${baseURL}/note/${note._id}`}
            style={{ marginRight: "5px" }}
          >
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <LinkedinShareButton
            url={`${baseURL}/note/${note._id}`}
            style={{ marginRight: "5px" }}
          >
            <LinkedinIcon size={32} round={true} />
          </LinkedinShareButton>
          <WhatsappShareButton url={`${baseURL}/note/${note._id}`}>
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
        </MenuItem>
      </Menu>
    </div>
  );
}
