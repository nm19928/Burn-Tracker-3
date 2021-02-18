import React, {Fragment,useState} from "react"
import Axios from "axios"
var url = "http://localhost:5000"
if (process.env.NODE_ENV === "production"){
  url = ""
}

function Login(){

  const [credentials,setCredentials] = useState({
    username:"",
    password:""
  })

  const [validLogin,setValidLogin] = useState(true)

  const handleChange = event => {
    event.preventDefault()
    const {name,value} = event.target

    setCredentials(preValue => {
      return(
        {...preValue,
        [name]:value
      })
    })
  }


  const submitChange =  async event => {
    const response = await Axios({
      method: "Post",
      data:{
        username:credentials["username"],
        password:credentials["password"]
      },
      withCredentials:true,
      url:`${url}/login`
    })
    if (response.data === "Sucess"){
    window.location = "/"
    } else {
      event.preventDefault()
      setValidLogin(false)
    }
  }

  const invalidLogin = () => {
    if (validLogin === false){
      return(
        <p className = "Invalid">Invalid Username or password.Please try again</p>
      )
    }
  }

  return(
    <Fragment>
    <div className = "sidenav" id="login-pg">
       <div className ="page-main-text">
          <h2>Burn Tracker</h2>
          <h2>Login Page</h2>
       </div>
    </div>
    <div className="main">
      <div className="col-md-6 col-sm-12">
        <div className="page-form">
          <div className="form-group">
          <label>Username</label>
          <input className = "form-control" type="text" onChange={handleChange} placeholder="Username" name="username" autoComplete="off"/>
          </div>
          <div className="form-group">
          <label>Password</label>
          <input className = "form-control" type="password" onChange={handleChange} placeholder="Password" name="password" autoComplete="off"/>
          <br />
          {invalidLogin()}
          <button onClick={submitChange} className="btn btn-primary">Login</button>
          </div>
          <a href="register">Not a current user? Click here to Register!</a>
          <br />
          <br />
          <a href="reset-password">Forgot Password? Click here!</a>
        </div>
      </div>
    </div>
    </Fragment>
  )
}

export default Login
