import React from 'react'
import Home from "./Home"
import FoodInput from "./FoodInput"
import Calendar from './Calendar/Calendar'
import FoodInfo from './FoodInfo'
import FoodList from './FoodList'
import ModifyFood from "./ModifyFood"
import ModifyActivity from "./ModifyActivity"
import Activity from "./Activity"
import InvalidRoute from "./InvalidRoute"
import {Navbar,Nav} from 'react-bootstrap'
import Axios from "axios"
import "./Styles.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
var url = "http://localhost:5000"
if (process.env.NODE_ENV === "production"){
  url = ""
}


function AuthRoutes(props) {

  const loggingOut = () => {
    Axios({
      method:"Get",
      withCredentials:true,
      url:`${url}/logout`
    }).then((res) => {
      const response = res.data
      if (response === "Logged Out"){
        window.location = "/login"
      }
    }
  )}

  const currentDate = () => {
    var d = new Date();
    var datestring = ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) + "-" + d.getFullYear()
    return datestring
  }

  return(
    <Router>
    <Navbar className="navbar navbar-default py-4" bg="info" variant="dark" expand="lg" sticky="top">
    <Navbar.Brand className = "Username">Welcome {props.user}!</Navbar.Brand>
    <Nav className="ml-auto">
        <Navbar.Brand className = "Nav-item" href="/">Home</Navbar.Brand>
        <Navbar.Brand className = "Nav-item" href="/calendar">Calendar</Navbar.Brand>
        <Navbar.Brand className = "Nav-item" href={`/foodinput/${currentDate()}`}>Enter Food</Navbar.Brand>
        <Navbar.Brand className = "Nav-item" href={`/activity/${currentDate()}`}>Activity</Navbar.Brand>
        <Navbar.Brand className = "Nav-item" onClick={loggingOut}>Log Out</Navbar.Brand>
    </Nav>
    </Navbar>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/FoodInput/:date" children = {<FoodInputChild />}/>
        <Route exact path="/calendar">
          <Calendar />
        </Route>
        <Route exact path="/foodinfo/:id" children = {<FoodChild />} />
        <Route exact path="/calendar/:date" children = {<CalendarChild />} />
        <Route exact path="/modify-food/:id" children = {<ModifyFoodChild />} />
        <Route exact path="/modify-activity/:id" children = {<ModifyActivityChild />} />
        <Route exact path="/activity/:date" children= {<ActivityInputChild />} />
        <Route path="">
          <InvalidRoute />
        </Route>
      </Switch>
    </Router>
    )
}

function FoodChild() {
  let { id } = useParams();

  return (
    <FoodInfo id = {id}/>
  );
}

function CalendarChild() {
  let { date } = useParams();

  return (
    <FoodList date = {date}/>
  );
}

function ModifyFoodChild () {
  let {id} = useParams()

  return (
    <ModifyFood id = {id} />
  )
}

  function ModifyActivityChild () {
    let {id} = useParams()

    return (
      <ModifyActivity id = {id} />
    )
  }

  function FoodInputChild () {
    let {date} = useParams()

    return (
      <FoodInput date = {date} />
    )
  }

  function ActivityInputChild () {
    let {date} = useParams()

    return (
      <Activity date = {date} />
    )
  }



export default AuthRoutes;
