import React from 'react'
import Welcome from "./Welcome"
import Login from './Login'
import Register from "./Register"
import SendReset from "./SendReset"
import PasswordReset from "./PasswordReset"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

function SignIn(props) {
    return(
    <Router>
    <Switch>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <Route exact path="/">
        <Welcome />
      </Route>
      <Route exact path="/reset-password">
        <SendReset />
      </Route>
      <Route exact path = "/reset-password/:username/:token" children = {<ResetChild />} />
      </Switch>
    </Router>
    )
  }

  function ResetChild() {
    let { username, token } = useParams();

    return (
      <PasswordReset token = {token} username = {username}/>
    );
  }

export default SignIn
