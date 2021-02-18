import React, {Fragment,useState} from "react"
import Axios from "axios"
var url = "http://localhost:5000"
if (process.env.NODE_ENV === "production"){
  url = ""
}

function Register(){

  const [credentials,setCredentials] = useState({
    email:"",
    username:"",
    password:"",
    confirmPassword:""
  })

  const [accountCreated, setAccountCreated] = useState(false)

  const [userExists,setUserExists] = useState("")
  const [match,setMatch] = useState(true)

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
      url:`${url}/registerUser`
    }).then((res) =>{
      if (res.data === 'Sucess') {
          setAccountCreated(true)
          setTimeout(function(){
            window.location = "/"
          },2000)
      } else if (res.data === 'Exists') {
        e.preventDefault()
        setUserExists(true)
      }
    })
  }}

  const passwordMatch = () => {
    if (match === false){
      return(
      <p className = "Invalid">Passwords do not match. Please re-enter</p>
    )}
  }

  const exists = () => {
    if (userExists === true){
      return(
      <p className = "Invalid">Username already exists. Please choose a different one.</p>
    )}
  }

  const registerForm = () =>{
    return(
      <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
            <input className = "form-control" type="email" placeholder="Email Address" name="email" onChange={handleChange} autoComplete="off" required/>
            </div>
              <div className="form-group">
              <label>User Name</label>
              <input className = "form-control" type="text" placeholder="username" name="username" onChange={handleChange} autoComplete="off" required/>
              </div>
              <div className="form-group">
              <label>Password</label>
              <input className = "form-control" type="password" placeholder="Password" name="password" onChange={handleChange} autoComplete="off" required/>
              </div>
              <div className="form-group">
              <label>Confirm Password</label>
              <input className = "form-control" type="password" placeholder="Password" name="confirmPassword" onChange={handleChange} autoComplete="off"/>
            </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
          {passwordMatch()}
          {exists()}
      </div>
    )
  }

  const registered = () => {
    return(
      <div>
      <p>You have been Registered! You will now be redirected to the home page.</p>
      </div>
    )
  }

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
          {!accountCreated ? registerForm():registered()}
          </div>
        </div>
      </div>
    </Fragment>)
}

export default Register
