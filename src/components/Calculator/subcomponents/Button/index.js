import { useContext } from "react";
import {
  pressOnAc,
  pressZero,
  pressNumber,
  pressDot,
  pressPlusMinus,
  pressNormalOperator,
  pressEquals,
  pressClear,
} from "../../resources/button-functions";
import { CalculatorContext } from "../../resources/CalculatorContext";
import { ButtonType } from "../../resources/constants";

const Button = ({type, children}) => {

  const {
    isOn, setIsOn,
    prevValue, setPrevValue,
    currentValue, setCurrentValue,
    currentOperator, setCurrentOperator,
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
          pressDot(currentValue, setCurrentValue, currentOperator, prevValue, setPrevValue);
        };
      case ButtonType.PLUS_MINUS:
        return () => {
          pressPlusMinus(currentValue, setCurrentValue, currentOperator, prevValue, setPrevValue);
        };
      case ButtonType.ZERO:
        return () => {
          pressZero(currentValue, setCurrentValue, currentOperator, prevValue);
        };
      case ButtonType.ONE:
        return () => {
          pressNumber(1, currentValue, setCurrentValue, currentOperator, prevValue, setPrevValue);
        };
      case ButtonType.TWO:
        return () => {
          pressNumber(2, currentValue, setCurrentValue, currentOperator, prevValue, setPrevValue);
        };
      case ButtonType.THREE:
        return () => {
          pressNumber(3, currentValue, setCurrentValue, currentOperator, prevValue, setPrevValue);
        };
      case ButtonType.FOUR:
        return () => {
          pressNumber(4, currentValue, setCurrentValue, currentOperator, prevValue, setPrevValue);
        };
      case ButtonType.FIVE:
        return () => {
          pressNumber(5, currentValue, setCurrentValue, currentOperator, prevValue, setPrevValue);
        };
      case ButtonType.SIX:
        return () => {
          pressNumber(6, currentValue, setCurrentValue, currentOperator, prevValue, setPrevValue);
        };
      case ButtonType.SEVEN:
        return () => {
          pressNumber(7, currentValue, setCurrentValue, currentOperator, prevValue, setPrevValue);
        };
      case ButtonType.EIGHT:
        return () => {
          pressNumber(8, currentValue, setCurrentValue, currentOperator, prevValue, setPrevValue);
        };
      case ButtonType.NINE:
        return () => {
          pressNumber(9, currentValue, setCurrentValue, currentOperator, prevValue, setPrevValue);
        };
      case ButtonType.ADD:
        return () => {
          pressNormalOperator(ButtonType.ADD, currentValue, setCurrentOperator);
        }
      case ButtonType.SUBTRACT:
        return () => {
          pressNormalOperator(ButtonType.SUBTRACT, currentValue, setCurrentOperator);
        }
      case ButtonType.MULTIPLY:
        return () => {
          pressNormalOperator(ButtonType.MULTIPLY, currentValue, setCurrentOperator);
        }
      case ButtonType.DIVIDE:
        return () => {
          pressNormalOperator(ButtonType.DIVIDE, currentValue, setCurrentOperator);
        }
    case ButtonType.EQUALS:
      return () => {
        pressEquals(currentValue, prevValue, currentOperator, setCurrentValue, setCurrentOperator, setPrevValue);
      }
    case ButtonType.CLEAR:
      return () => {
        pressClear(setCurrentValue);
      }

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