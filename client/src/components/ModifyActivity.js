import React, {Fragment, useState, useEffect} from "react"
import Axios from "axios"
var url = "http://localhost:5000"
if (process.env.NODE_ENV === "production"){
  url = ""
}

function ModifyActivity(props) {
  const [activity, setActivity] = useState({
    id:"",
    calories:"",
    date:""
  })
  const [isloading,setIsLoading] = useState(true)
  const [existingData, setExistingData] = useState(false)
  const [transferFail, setTransferFail] = useState("")

  const getInfo = () => {
    Axios({
      method:"Get",
      withCredentials:true,
      url:`${url}/activity-modify/${props.id}`
    }).then((res) =>{
      const result = res.data
    if (result !== false ){
      setActivity(result)
      setExistingData(true)
    }
      setIsLoading(false)
    })
  }

  useEffect(() => {
    document.body.classList = "Activity"
    getInfo()
  },[])

  const handleChange = event => {
    event.preventDefault()
    const {value,name} = event.target
    setActivity(preValue => {
      return{
        ...preValue,
        [name]:value}
    })
  }


  const handleSubmit = () => {
    const data = {activity}
    Axios({
      method:"Post",
      data:data,
      withCredentials:true,
      url:`${url}/activity-modify/${props.id}`
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

  if (isloading){
    return(
      <Fragment>
      <div className = "NullData" >Page is Loading...</div>
      </Fragment>
    )
  } else {
    if (existingData === false) {
      return(
        <Fragment>
        <div className = "NullData">
        <p>Sorry, but there doesn't seem to be any data for this entry.</p>
        </div>
        </Fragment>
      )
  } else {
    return(
      <Fragment>
      <div className = "InputContainer">
      <h1>Modify Calories Burned</h1>
      <input name = "calories" onChange = {handleChange} type = "number" value = {activity["calories"]} />
      <br />
      <button id = "ActivityButton" className = "btn btn-success btn-lg btn-radius" onClick = {handleSubmit}>Submit</button>
      </div>
      {transferFailed()}
      </Fragment>
    )}
  }
}

export default ModifyActivity
