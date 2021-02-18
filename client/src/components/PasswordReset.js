import React, {Fragment,useState,useEffect} from "react"
import Axios from "axios"
var url = "http://localhost:5000"
if (process.env.NODE_ENV === "production"){
  url = ""
}

function PasswordReset(props){

  const [credentials,setCredentials] = useState({
    username:props.username,
    token:props.token,
    password:"",
    confirmPassword:""
  })

  const [match,setMatch] = useState(true)

  const [reset, setReset] = useState()

  const {password,confirmPassword} = credentials

  const handleChange = (event) => {
    const {name,value} = event.target
    setCredentials(preValue => {
      return{
        ...preValue,
        [name]:value}
    }
  )}

  const handleSubmit = (e) => {
    if (password !== confirmPassword){
    e.preventDefault()
    setMatch(false)
  } else {
    e.preventDefault()
    setMatch(true)
      Axios({
      method: "Post",
      data:credentials,
      withCredentials:true,
      url:`${url}/resetPassword`
    }).then((res) =>{
      if (res.data === true) {
        setReset(res.data)
          setTimeout(function(){
            window.location = "/login"
          },2000)
      }}
    )}
  }

  const registerForm = () =>{
    return(
      <div>
      <form onSubmit={handleSubmit}>
          <div className="form-group">
          <label>Password</label>
          <input className = "form-control" type="password" placeholder="Password" name="password" onChange={handleChange} autoComplete="off" required/>
          </div>
          <div className="form-group">
          <label>Confirm Password</label>
          <input className = "form-control" type="password" placeholder="Password" name="confirmPassword" onChange={handleChange} autoComplete="off"/>
        </div>
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
        {match === false ? <p className = "Invalid">Passwords do not match. Please re-enter</p>:null}
      </div>
    )}

  const resetConfirmed = () => {
    return(
      <div>
      <p>Password reset! You will now be redirected to the login page.</p>
      </div>
    )}

  return(
    <Fragment>
      <div className = "sidenav" id="pRes-pg">
         <div className ="page-main-text">
            <h2>Burn Tracker</h2>
            <h2>Password Reset</h2>
         </div>
      </div>
      <div className="main">
        <div className="col-md-6 col-sm-12">
          <div className="page-form">
          {reset ? resetConfirmed():registerForm()}
          </div>
        </div>
      </div>
    </Fragment>)
  }

export default PasswordReset
