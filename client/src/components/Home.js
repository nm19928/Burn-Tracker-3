import React, {Fragment,useEffect} from "react"


const Home = () => {

  const currentDate = () => {
    var d = new Date();
    var datestring = ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) + "-" + d.getFullYear()
    return datestring
  }

  useEffect(() => {
    document.body.classList = "Home"
  })

  return(
    <Fragment>
    <div className = "col-sm-12 col-md-12 HomeContainer">
    <ul>
      <li>
      <div className = "Container-Element">
      <a href = {`foodinput/${currentDate()}`}>Enter Food</a>
      <p>Click here to input your food data</p>
      <p>The data will be saved to todays date</p>
      </div>
    </li>
      <li>
      <div className = "Container-Element">
      <a href = "calendar">Calendar</a>
      <p>The calendar page is where you can pick certain days</p>
      <p>See both your calorie intake and calories burned for that day</p>
      </div>
    </li>
      <li>
      <div className = "Container-Element">
      <a href = {`activity/${currentDate()}`}>Activity</a>
      <p>Click here to input your Activity data</p>
      <p>Based on the amount of calories burned today</p>
      </div>
    </li>
    </ul>
    </div>
    </Fragment>
  )
}

export default Home
