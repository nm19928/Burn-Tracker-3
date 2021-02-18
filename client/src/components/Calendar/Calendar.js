import React, {useEffect, useState } from "react";
import moment from "moment"
import "./Calendar.css"
import buildCalendar from "./build"


const Calendar = () => {
  const [calendar,setCalendar] = useState([])
  const [value,setValue] = useState(moment())

  useEffect(()=>{
    document.body.classList = "CalendarPage"
    setCalendar(buildCalendar(value))
},[value])

  const handleClick = (date) => {
    window.location = `/calendar/${date}`
  }

  function previousMonth(){
    return value.clone().subtract(1,"month")
  }

  function currentMonth(){
    return value.format("MMMM")
  }

  function nextMonth(){
    return value.clone().add(1,"month")
  }

  function currentYear(){
    return value.format("YYYY")
  }

  return(
    <div className = "calendar">
      <div className = "header">
        <div className = "previous" onClick = {()=>setValue(previousMonth())}>{String.fromCharCode(171)}</div>
        <div className = "current">{currentMonth()} {currentYear()}</div>
        <div className = "next" onClick = {()=>setValue(nextMonth())}>{String.fromCharCode(187)}</div>
      </div>
    {calendar.map((week) => (
      <div>
      {week.map((day) => (
        <div onClick={()=>{handleClick(day.format("MM-DD-YYYY").toString())}} className="day">{day.format("DD").toString()}</div>
      ))}
      </div>
    ))}
    </div>
  )
}


export default Calendar;
