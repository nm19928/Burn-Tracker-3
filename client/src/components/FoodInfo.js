import React, {Fragment,useState, useEffect} from "react"
import Axios from "axios"
var url = "http://localhost:5000"
if (process.env.NODE_ENV === "production"){
  url = ""
}

function FoodInfo(props){

  const [foodInfo, setfoodInfo] = useState({})

  const [loading,setLoading] = useState(true)

  const {Food,cals,fat,carbs,servings} = foodInfo


  useEffect(()=>{
    document.body.classList = "FoodInfo"
    Axios({
    method:"Get",
    withCredentials:true,
    url:`${url}/getFoodInfo/${props.id}`
  }).then((res) => {
    setfoodInfo(res.data)
    setLoading(false)
  })
  },[])

  const deleteFoodItem = () => {
    Axios({
      method:"Post",
      withCredentials:true,
      data:foodInfo,
      url:`${url}/deleteFood`
    }).then((res) => {
      if (res.data === true) {
        window.location = `/calendar/${foodInfo["date"]}`
      }
    })
  }

if (loading === true){
  return(
  <Fragment>
    <div className = "FoodContainer">
    <p>Page is loading...</p>
    </div>
  </Fragment>
)} else {
  return(
    <Fragment>
    <div className = "FoodContainer">
    <h1>Food Info</h1>
    <p>Food: {Food}</p>
    <p>Total Cals: {cals * servings}</p>
    <p>Total Fat: {fat * servings}</p>
    <p>Total Carbs: {carbs * servings}</p>
    <p>Servings Amount: {servings}</p>
    <br />
    <a href={`/modify-food/${props.id}`}>
    <button className = "btn btn-success btn-sm btn-radius">Modify Food</button>
    </a>
    <button className = "btn btn-warning btn-sm btn-radius" onClick = {deleteFoodItem}>Delete Food</button>
    </div>
    </Fragment>
  )}
}

export default FoodInfo
