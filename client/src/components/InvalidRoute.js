import React, {Fragment, useEffect} from "react"


function InvalidRoute(){

  useEffect(() => {
    document.body.classList = "Home"
  },[])

  return(
    <Fragment>
    <h1 className = "InvalidRoute">The page you are looking for does not exist</h1>
    </Fragment>
  )
}

export default InvalidRoute
