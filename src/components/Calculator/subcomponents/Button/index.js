import { useContext } from "react";
import {
  pressOnAc,
  pressZero,
  pressDot,
} from "../../resources/button-functions";
import { CalculatorContext } from "../../resources/CalculatorContext";
import { ButtonType } from "../../resources/constants";

const Button = ({type, children}) => {

  const {
    isOn, setIsOn,
    currentValue, setCurrentValue,
    clearAll,
  } = useContext(CalculatorContext);

  //#region Regular Methods
  const getActionByType = () => {
    if (!isOn && type !== ButtonType.ON_AC) {
      return () => {};
    }

    switch(type) {
      default:
      case ButtonType.ON_AC:
        return () => {
          pressOnAc(setIsOn, clearAll);
        };
      case ButtonType.DOT:
        return () => {
          pressDot(currentValue, setCurrentValue);
        };
      case ButtonType.ZERO:
        return () => {
          pressZero(currentValue, setCurrentValue);
        };

    }
  }
  // #end

  //#region Event Handlers

  const clickButton = () => {
    let action = getActionByType();
    action();
  }

  //#endregion

  return (
    <div 
      className="button"
      onClick={clickButton}
    >
      {children}
    </div>
  )
}

export default Button;