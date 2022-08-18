import { useContext, useEffect, useState } from "react"
import { CalculatorContext } from "../../resources/CalculatorContext";
import { getOperatorText } from "../../resources/helpers";

const Display = ({}) => {

  const {
    isOn,
    currentValue,
    currentOperator,
    prevValue,
  } = useContext(CalculatorContext);

  const [operatorText, setOperatorText] = useState('');
  const [prevValueText, setPrevValueText] = useState('');

  useEffect(() => {
    setOperatorText(getOperatorText(currentOperator));
  }, [currentOperator]);

  useEffect(() => {
    if (prevValue !== undefined) {
      setPrevValueText(
        prevValue !== null
        ? prevValue
        : ''
      );
    }
    
  }, [prevValue]);

  return (
    <div className="display">
      <div className="main-text">
        { isOn
          ? currentValue
          : ''
        }
      </div>
      <div className="operator-text">
        { isOn
          ? operatorText
          : ''
        }
      </div>
      <div className="prev-value-text">
        { isOn
          ? prevValueText
          : ''
        }
      </div>
    </div>
  )
}

export default Display;