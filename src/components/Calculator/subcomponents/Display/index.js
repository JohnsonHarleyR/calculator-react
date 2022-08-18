import { useContext, useEffect, useRef } from "react"
import { CalculatorContext } from "../../resources/CalculatorContext";

const Display = ({}) => {

  const {
    isOn,
    currentValue,
  } = useContext(CalculatorContext);

  return (
    <div className="display">
      <div className="main-text">
        { isOn
          ? currentValue
          : ''
        }
      </div>
    </div>
  )
}

export default Display;