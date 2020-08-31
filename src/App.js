import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NotesProvider from './Contexts/NotesContext';
import Menu from './Components/Menu/Menu';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <NotesProvider>
        <Menu />
      </NotesProvider>
    </div>
  );
}

export default App;
