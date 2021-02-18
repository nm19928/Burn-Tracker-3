import emailjs from 'emailjs-com';
import React, {Fragment, useState} from "react"
import Axios from "axios"
const crypto = require('crypto')
var url = "http://localhost:5000"
if (process.env.NODE_ENV === "production"){
  url = ""
}

function SendReset(){
  var id = crypto.randomBytes(12).toString("hex")

  const [confirmed, setConfirmed] = useState(false)
  const [error, setError] = useState(false)
  const [credentials,setCredentials] = useState({
    email:"",
    username:"",
    token:id
  })

  const handleChange = event => {
    const {name,value} = event.target
    setCredentials(preValue => {
      return{
        ...preValue,
        [name]:value}
    })
  }

  const sendEmail = e =>{
    e.preventDefault()
    Axios({
      method:"Post",
      withCredentials:true,
      data:credentials,
      url:`${url}/generateToken`
    }).then((res)=>{
      if (res.data === true){
        e.preventDefault();

        setConfirmed(true)

        emailjs.sendForm('service_dyntoxu', 'template_2yxtmtf', e.target, 'user_JlP0qt6r4zxfXQgGWwYGx')
        .then((result) => {
          setConfirmed(true)
          },(error) => {
          })
      } else {
        setError(true)
      }
    })
  }

  const resetForm = () =>{
    return(
      <form onSubmit={sendEmail}>
      <div className="form-group">
      <label>Username</label>
      <input className = "form-control" onChange = {handleChange} type="text" placeholder="Username" name="username" autoComplete="off" required/>
      </div>
      <div className="form-group">
      <label>Email</label>
      <input className = "form-control" onChange = {handleChange} type="email" placeholder="Email Address" name="email" autoComplete="off" required/>
      </div>
      <input className = "form-control" type="hidden" value={credentials["token"]} name="token"/>
      <button type="submit" className="btn btn-primary">Send</button>
      {error ? <p className = "Invalid">Username/Email does not exist. Please try again</p>:null}
      </form>
    )
  }

  const emailSucess = () => {
    return(
    <p>A link has been sent to your email where you can reset your password.</p>
    )
  }

  return(
    <Fragment>
    <div className = "sidenav" id="pRes-pg">
       <div className ="page-main-text">
          <h2>Burn Tracker</h2>
          <h2>Reset Password</h2>
       </div>
    </div>
    <div className="main">
      <div className="col-md-6 col-sm-12">
        <div className="page-form">
        {!confirmed ? resetForm():emailSucess()}
        </div>
      </div>
    </div>
    </Fragment>
    )
}

export default SendReset
