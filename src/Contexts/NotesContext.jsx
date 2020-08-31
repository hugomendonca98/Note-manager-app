import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import Api from "../Global/Api";

export const NotesContext = createContext();

const baseURL = "http://localhost:3000";

const toastifyConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnFocusLoss: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const NotesProvider = ({ children }) => {
  // ** ADICIONAR NOVAS NOTAS **
  const [openNotes, setOpenNotes] = useState(null);

  const [initialState, setInitialState] = useState({
    title: "",
    content: "",
    color: "",
  });

  async function handleSendNote(note) {
    try {
      await Api.post("/notes", note);
      setOpenNotes(false);
      toast.success("Nota Adicionada com sucesso!", { toastifyConfig });
      loadApi();
    } catch (event) {
      toast.error("Erro ao Adicionar Nota!", { toastifyConfig });
      console.error("Erro ao Adcionar Nota!", event);
    }
  }

  // ** REMOVER NOTA **
  async function handleRemoveNote(noteId) {
    try {
      const affirm = window.confirm("Tem certeza que deseja excluir ?");
      if (affirm) {
        await Api.delete(`/notes/${noteId}`);
        loadApi();
      }
    } catch (event) {
      toast.error("Erro ao Deletar Nota!", { toastifyConfig });
      console.error("Erro ao Deletar Nota!", event);
    }
  }

  // ** EDITANDO NOTAS **
  const [openEdit, setOpenEdit] = useState(null);

  const [oldNote, setOldNote] = useState({
    noteId: "",
    title: "",
    content: "",
    color: "",
  });

  async function sendEditNote({ title, content, color }) {
    try {
      await Api.put(`notes/${oldNote.noteId}`, {
        title: title,
        content: content,
        color: color,
      });
      setOpenEdit(false);
      setOpenNotes(false);
      loadApi();
    } catch (event) {
      toast.error("Erro ao Editar Nota!", { toastifyConfig });
      console.error("Erro ao Editar Nota!", event);
    }
  }

  // ** CARREGANDO API E DADOS DO BACKEND **
  const [apiLoaded, setApiLoaded] = useState([]);

  async function loadApi() {
    try {
      const response = await Api.get("/notes?sort=-createdAt");
      setApiLoaded(response.data);
    } catch (event) {
      toast.error("Erro ao Carregar Notas!", { toastifyConfig });
      console.error("Erro ao Carregar Notas!", event);
    }
  }

  useEffect(() => {
    loadApi();
  }, []);

  // ** PESQUISANDO NOTAS **
  async function handleSearchNotes(searchNotes) {
    try {
      const search = searchNotes ? `&title__regex=/${searchNotes}/` : "";
      const response = await Api.get(`/notes?sort=-createdAt${search}`);
      setApiLoaded(response.data);
    } catch (event) {
      console.error("Erro ao Pesquisar Notas!", event);
    }
  }

  return (
    <NotesContext.Provider
      value={{
        apiLoaded,
        handleSendNote,
        handleSearchNotes,
        openNotes,
        handleRemoveNote,
        sendEditNote,
        openEdit,
        setOpenEdit,
        setOldNote,
        oldNote,
        initialState,
        setInitialState,
        setOpenNotes,
        baseURL,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;
