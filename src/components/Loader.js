import Lottie from 'lottie-react'
import React from 'react'
import anim from "../assets/anim.json"

function Loader() {
    return (
      <Lottie  style={{width: 350, height: 350 , position: "absolute" , top:"22%" , left:"40%"}} animationData={anim} loop={true} />
    )
  }
  
  export default Loader