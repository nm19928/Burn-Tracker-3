import React, {useState, Fragment,useEffect} from 'react'
import Axios from 'axios'
var url = "http://localhost:5000"
if (process.env.NODE_ENV === "production"){
  url = ""
}

const FoodInput = (props) => {
  const [foodItem, setFoodItem] = useState({
    Food:"",
    Cals:"",
    Fat:"",
    Carbs:"",
    Servings:"",
    Date:props.date
  })
  const [transferFail, setTransferFail] = useState("")

  useEffect(() => {
    document.body.classList = "InputValues"
  })

  const handleSubmit =  (event) => {
    event.preventDefault()
    const food = {foodItem}
    Axios({
      method: "Post",
      data:food,
      withCredentials:true,
      url:`${url}/foodInput`
    }).then((res) => {
      if (res.data === "Sucess"){
      setTransferFail(false)
      window.location = `/calendar/${props.date}`
    } else {
      setTransferFail(true)
    }
  })
}

  const handleChange = (event) => {
    const {name,value} = event.target

    setFoodItem(preValue => {
      return{
        ...preValue,
        [name]:value}
    }
  )}

  function transferFailed() {
    if (transferFail === true){
      return(
      <div className = "NullData">
      <p>It appears as though there was an issue connecting to the database.</p>
      <p>Please try again in a couple of minutes.</p>
      </div>
    )}
  }

  return(
    <Fragment>
    <div className = "InputContainer">
    <h1>Input Food</h1>
    <form onSubmit={handleSubmit}>
    <label>Food</label>
    <br />
    <input type="text" name="Food" onChange={handleChange} autoComplete="off" required/>
    <br />
    <label>Calories</label>
    <br />
    <input type="number" name="Cals" onChange={handleChange} autoComplete="off" required/>
    <br />
    <label>Fat</label>
    <br />
    <input type="number" name="Fat" onChange={handleChange} autoComplete="off" required/>
    <br />
    <label>Carbs</label>
    <br />
    <input type="number" name="Carbs" onChange={handleChange} autoComplete="off" required/>
    <br />
    <label>Servings</label>
    <br />
    <input type="number" name="Servings" onChange={handleChange} autoComplete="off" required/>
    <br />
    <br />
    <button className = "btn btn-success btn-lg btn-radius">Submit</button>
    </form>
    </div>
    {transferFailed()}
    </Fragment>
  )
}

export default FoodInput
