import React, {Fragment} from "react"

function Welcome(){

  return(
  <Fragment>
  <div className = "sidenav" id="login-pg">
     <div className ="page-main-text">
        <h2>Burn Tracker</h2>
     </div>
  </div>
  <div className="main">
    <div className="col-md-6 col-sm-12">
      <div className="page-form" id = "WelcomePage">
      <h1>Welcome to Burn Tracker!</h1>
      <br/>
        <a href="register">Click here to Register!</a>
        <br />
        <br />
        <a href="login">Click here to Login!</a>
      </div>
    </div>
  </div>
  </Fragment>
  )
}

export default Welcome
