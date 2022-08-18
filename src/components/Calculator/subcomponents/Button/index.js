import { useContext } from "react";
import {
  pressOnAc,
  pressZero,
  pressNumber,
  pressDot,
  pressPlusMinus,
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
      case ButtonType.PLUS_MINUS:
        return () => {
          pressPlusMinus(currentValue, setCurrentValue);
        };
      case ButtonType.ZERO:
        return () => {
          pressZero(currentValue, setCurrentValue);
        };
      case ButtonType.ONE:
        return () => {
          pressNumber(1, currentValue, setCurrentValue);
        };
      case ButtonType.TWO:
        return () => {
          pressNumber(2, currentValue, setCurrentValue);
        };
      case ButtonType.THREE:
        return () => {
          pressNumber(3, currentValue, setCurrentValue);
        };
      case ButtonType.FOUR:
        return () => {
          pressNumber(4, currentValue, setCurrentValue);
        };
      case ButtonType.FIVE:
        return () => {
          pressNumber(5, currentValue, setCurrentValue);
        };
      case ButtonType.SIX:
        return () => {
          pressNumber(6, currentValue, setCurrentValue);
        };
      case ButtonType.SEVEN:
        return () => {
          pressNumber(7, currentValue, setCurrentValue);
        };
      case ButtonType.EIGHT:
        return () => {
          pressNumber(8, currentValue, setCurrentValue);
        };
      case ButtonType.NINE:
        return () => {
          pressNumber(9, currentValue, setCurrentValue);
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