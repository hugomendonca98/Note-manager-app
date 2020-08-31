import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NoteDetails from "../../Components/NoteDetails/NoteDetails";
import Notes from '../../Components/Notes/Notes';

const Routes = () => (
  <BrowserRouter>
    <Switch>
        <Route exact path="/" component={Notes} />
        <Route path="/note/:id" component={NoteDetails} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
