
//#region Helpers

import { ButtonType } from "./constants";

const isCharacterInString = (str, char) => {
  for (let i = 0; i < str.length; i++) {
    let strChar = i !== str.length - 1
      ? str.substring(i, i + 1)
      : str.substring(i);
    if (strChar === char) {
      return true;
    }
  }
  return false;
}

const trimMinus = (str) => {
  if (`${str}`.substring(0, 1) === '-') {
    return str.substring(1);
  }
  return str;
}

// for deciding if an operator can be used
const hasNonZeroDigit = (value) => {
  let str = `${value}`;
  let digits = ['1','2','3','4','5','6','7','8','9'];
  for (let i = 0; i < digits.length; i++) {
    if (isCharacterInString(str, digits[i])) {
      return true;
    }
  }
  return false;
}

const performCalculation = (
  prevValue,
  currentValue,
  operatorType,
) => {
  let value1 = parseFloat(prevValue);
  let value2 = parseFloat(currentValue);
  let result = 0;
  switch(operatorType) {
    case ButtonType.ADD:
      result = value1 + value2;
      break;
    case ButtonType.SUBTRACT:
      result = value1 - value2;
      break;
    case ButtonType.DIVIDE:
      result = value1 / value2;
      break;
    case ButtonType.MULTIPLY:
      result = value1 * value2;
      break;
  }
  return `${result}`;
}

const calculatePercent = (value) => {
  let parsed = parseFloat(value);
  let calculated = parsed / 100;
  return `${calculated}`;
}

const calculateSquareRoot = (value) => {
  let parsed = parseFloat(value);
  let calculated = Math.sqrt(parsed);
  return `${calculated}`;
}

const canCalculateSquareRoot = (value) => {
  let parsed = parseFloat(value);
  return parsed >= 0;
}


//#endregion

//#region
export const pressSquareRoot = (currentValue, setCurrentValue) => {
  if (canCalculateSquareRoot(currentValue)) {
    setCurrentValue(calculateSquareRoot(currentValue));
  }
}

export const pressPercent = (currentValue, setCurrentValue) => {
  setCurrentValue(calculatePercent(currentValue));
}

export const pressClear = (setCurrentValue) => {
  setCurrentValue('0');
}

export const pressEquals = (
  currentValue,
  prevValue,
  currentOperator,
  setCurrentValue,
  setCurrentOperator,
  setPrevValue,
) => {
  if (currentOperator === null || prevValue === null) {
    return;
  }

  if (currentOperator === ButtonType.DIVIDE &&
      !hasNonZeroDigit(currentValue)) {
        return;
  }
  let result = performCalculation(prevValue, currentValue, currentOperator);
  setPrevValue(null);
  setCurrentOperator(null);
  setCurrentValue(result);
}

export const pressNormalOperator = (type, currentValue, setCurrentOperator) => {
  // if (!hasNonZeroDigit(currentValue)) {
  //   return;
  // }

  setCurrentOperator(type);
}

export const pressOnAc = (setIsOn, clearAll) => {
  setIsOn(true);
  clearAll();
}

export const pressDot = (
  currentValue,
  setCurrentValue,
  currentOperator,
  prevValue,
  setPrevValue,
) => {

  let value = currentValue;
  if (currentOperator !== null && prevValue === null) {
    value = 0;
    setPrevValue(parseFloat(currentValue).toString());
  }

  if (isCharacterInString(value, '.')) {
    return;
  }

  let newValue = `${value}.`;
  setCurrentValue(newValue);
}

export const pressZero = (
  currentValue,
  setCurrentValue,
  currentOperator,
  prevValue,
) => {
  if ((`${trimMinus(currentValue)}` === '0') ||
      (currentOperator !== null && prevValue === null)) {
    return;
  }

  let newValue = `${currentValue}0`;
  setCurrentValue(newValue);
}

export const pressNumber = (
    number,
    currentValue,
    setCurrentValue,
    currentOperator,
    prevValue,
    setPrevValue,
  ) => {
  
  let value = currentValue;
  // check if anything needs to be moved to prev value
  if (currentOperator !== null && prevValue === null) {
    value = 0;
    setPrevValue(parseFloat(currentValue).toString());
  }

  // determine new value
  let newValue = `${trimMinus(value)}` !== '0'
    ? `${value}${number}`
    : `${number}`;
  if (isCharacterInString(`${value}`, '-') &&
      !isCharacterInString(`${newValue}`, '-')) {
    newValue = `-${newValue}`;
  }
  setCurrentValue(newValue);
}

export const pressPlusMinus = (
  currentValue,
  setCurrentValue,
  currentOperator,
  prevValue,
  setPrevValue,
) => {
  
  let value = currentValue;
  if (currentOperator !== null && prevValue === null) {
    value = 0;
    setPrevValue(parseFloat(currentValue).toString());
  }

  let newValue = isCharacterInString(value, '-')
    ? value.substring(1)
    : `-${value}`;

    setCurrentValue(newValue);
}

//#endregion