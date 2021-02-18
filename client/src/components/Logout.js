import React, {Fragment} from "react"
import Axios from "axios"
var url = "http://localhost:5000"
if (process.env.NODE_ENV === "production"){
  url = ""
}

function LogOut(){

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

  return(
    <Fragment>
    <button onClick = {() => loggingOut()}>Log Out</button>
    </Fragment>
  )
}

export default LogOut
