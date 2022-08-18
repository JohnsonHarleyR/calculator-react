import { useEffect, useRef } from "react"


const Display = ({mainText, topCornerText}) => {

  return (
    <div className="display">
      <div className="main-text">
        {mainText}
      </div>
    </div>
  )
}

export default Display;