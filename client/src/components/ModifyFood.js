import React, {Fragment,useState,useEffect} from "react"
import Axios from "axios"
var url = "http://localhost:5000"
if (process.env.NODE_ENV === "production"){
  url = ""
}


function ModifyFood(props) {
  const [foodList, setFoodList] = useState({})
  const [existingData, setExistingData] = useState(false)
  const [isloading, setIsLoading] = useState(true)
  const [transferFail, setTransferFail] = useState("")

  const handleChange = event => {
    const {name,value} = event.target
    setFoodList(preValue => {
      return{
        ...preValue,
        [name]:value}
    })
  }

  const getInfo = () => {
    Axios({
      method:"Get",
      withCredentials:true,
      url:`${url}/food-modify/${props.id}`
    }).then((res) => {
      const result = res.data
    if (result !== false ){
      setFoodList(result)
      setExistingData(true)
    }
      setIsLoading(false)
    })
  }

  const handleSubmit = () => {
    const food = {foodList}
    Axios({
      method:"Post",
      data:food,
      withCredentials:true,
      url:`${url}/food-modify/${props.id}`
    }).then((res) => {
      if (res.data === "Sucess"){
      setTransferFail(false)
      window.location = `/foodInfo/${props.id}`
    } else {
      setTransferFail(true)
    }
  })
}

  useEffect(() => {
    getInfo()
    document.body.classList = "FoodInfo"
  },[])

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
      <div></div>
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
    <h1>Modify Food Info</h1>
    <label>Food</label>
    <br />
    <input type="text" name="Food" onChange={handleChange} autoComplete="off" value={foodList["Food"]} required/>
    <br />
    <label>Calories</label>
    <br />
    <input type="number" name="cals" onChange={handleChange} autoComplete="off" value={foodList["cals"]} required/>
    <br />
    <label>Fat</label>
    <br />
    <input type="number" name="fat" onChange={handleChange} autoComplete="off" value={foodList["fat"]} required/>
    <br />
    <label>Carbs</label>
    <br />
    <input type="number" name="carbs" onChange={handleChange} autoComplete="off" value={foodList["carbs"]} required/>
    <br />
    <label>Servings</label>
    <br />
    <input type="number" name="servings" onChange={handleChange} autoComplete="off" value={foodList["servings"]} required/>
    <br />
    <br />
    <button className = "btn btn-success btn-lg btn-radius" onClick = {handleSubmit}>Submit</button>
    </div>
    {transferFailed()}
    </Fragment>
    )}
  }
}

export default ModifyFood
