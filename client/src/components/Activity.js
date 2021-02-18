import React, {Fragment, useState, useEffect} from "react"
import Axios from "axios"
var url = "http://localhost:5000"
if (process.env.NODE_ENV === "production"){
  url = ""
}


function Activity(props){

  const [activity, setActivity] = useState({
    calories:"",
    date:props.date
  })
  const [existingData,setExistingData] = useState("")
  const [transferFail, setTransferFail] = useState("")

  const getData = () =>{
    const data = {activity}
    Axios({
      method:"POST",
      data:data,
      withCredentials:true,
      url:`${url}/existingActivity`
    }).then((res) => {
      if (res.data === true){
        setExistingData(true)
      }
    })
  }

  useEffect(() => {
    document.body.classList = "Activity"
    getData()
  })

  const handleChange = event => {
    event.preventDefault()
    const {name,value} = event.target
    setActivity(preValue=>{
      return{
        ...preValue,
        [name]:value}
    }
  )}

  const handleSubmit = () => {
    const data = {activity}
    Axios({
      method:"Post",
      data:data,
      withCredentials:true,
      url:`${url}/activity`
    }).then((res) => {
      if (res.data === "Sucess"){
        setTransferFail(false)
        window.location = `/calendar/${activity["date"]}`
      } else {
        setTransferFail(true)
      }
    })
  }

  function transferFailed() {
    if (transferFail === true){
      return(
      <div className = "NullData">
      <p>It appears as though there was an issue connecting to the database.</p>
      <p>Please try again in a couple of minutes.</p>
      </div>
    )}
  }

  if (existingData === true){
    return(
    <Fragment>
    <div className = "NullData">
    <p>It appears as though you have already entered in the calories you've burned today.</p>
    <p>If you wish to change the value, go to the calendar page and click on todays date.</p>
    </div>
    </Fragment>
  )} else {
  return(
    <Fragment>
    <div className = "InputContainer">
      <h1>How Many Calories Did You Burn Today?</h1>
      <input type = "number" autoComplete="off" name = "calories" onChange = {handleChange} />
      <br />
      <button onClick = {handleSubmit} id = "ActivityButton" className = "btn btn-success btn-lg btn-radius" >Submit</button>
    </div>
    {transferFailed()}
    </Fragment>
  )}
}

export default Activity
