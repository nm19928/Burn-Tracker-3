import React, {Fragment, useState, useEffect} from "react"
import Axios from "axios"
var url = "http://localhost:5000"
if (process.env.NODE_ENV === "production"){
  url = ""
}

function Registered(){
  const [userCredentials, setUserCredentials] = useState({})

  useEffect(()=>{
      Axios({
      method: "Get",
      withCredentials:true,
      url:`${url}/validation`
      }).then((res) => {
        const value = res.data
        setUserCredentials(value)
        if (res.data){}
      })
  },[])

  if (userCredentials["registered"] === true && userCredentials["confirmed"] === "Confirmed"){
  return(
    <Fragment>
      <div className = "sidenav" id="reg-pg">
         <div className ="page-main-text">
            <h2>Burn Tracker</h2>
            <h2>Register Page</h2>
         </div>
      </div>
      <div className="main">
        <div className="col-md-6 col-sm-12">
        <div className="page-form">
        <p>You have been Registered! You will now be redirected to the home page.</p>
        </div>
        </div>
      </div>
    </Fragment>
  )} else {
    return(
      null
    )
  }
}

export default Registered
