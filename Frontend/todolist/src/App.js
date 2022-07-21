import { Route, Switch } from "react-router-dom";
import NoteList from "./NoteList";
import NoteAdd from "./NoteAdd";
import NoteUpdate from "./NoteUpdate";
import Login from "./Login";
import "./App.css"

function App() {
  return (
    <div >
      <Switch>
        <Route exact path="/" render={props => (<Login />)} />
        <Route exact path="/list/user=:id" render={props => (<NoteList />)} />
        <Route exact path="/add/user=:id" render={props => (<NoteAdd />)} />
        <Route exact path="/update/:id/user=:usernum" render={props => (<NoteUpdate {...props} />)} />
      </Switch>
    </div>
  );
}

export default App;
