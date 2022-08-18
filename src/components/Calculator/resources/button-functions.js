
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
  let hasPercent1 = hasPercent(prevValue);
  let hasRoot1 = hasRoot(prevValue);
  let hasPercent2 = hasPercent(currentValue);
  let hasRoot2 = hasRoot(currentValue);

  let value1 = hasPercent1 === true
    ? `${prevValue}`.substring(0, value1.length - 1)
    : prevValue;
  value1 = hasRoot1 === true
    ? `${value1}`.length > 1
      ? `${value1}`.substring(1)
      : ''
    : value1;

  let value2 = hasPercent2 === true
    ? `${currentValue}`.substring(0, value2.length - 1)
    : currentValue;
  value2 = hasRoot2 === true
    ? `${value2}`.length > 1
      ? `${value2}`.substring(1)
      : ''
    : value2;

  let value1Parsed = parseFloat(value1);
  let value2Parsed = parseFloat(value2);

  if (hasPercent1) {
    value1Parsed = value1Parsed !== 0
      ? value1Parsed / 100
      : 0;
  }
  if (hasRoot1) {
    value1Parsed = Math.sqrt(value1Parsed);
  }

  if (hasPercent2) {
    value2Parsed = value2Parsed !== 0
      ? value2Parsed / 100
      : 0;
  }
  if (hasRoot2) {
    value2Parsed = Math.sqrt(value2Parsed);
  }


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

const hasPercent = (value) => {
  let str = `${value}`;
  if (str.substring(str.length - 1) === '%') {
    return true;
  }
  return false;
}

const hasRoot = (value) => {
  let str = `${value}`;
  let char = str.length > 1
    ? str.substring(0, 1)
    : str.substring(0);
  if (char === '√') {
    return true;
  }
  return false;
}

//#endregion

//#region

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
    let value = `${currentValue}`;
    let hasRoot = hasRoot(value);
    if (hasPercent(value)) {
      if (hasRoot) {
        value = `${value}`.length > 1
        ? `${value}`.substring(1)
        : '0';
      }
      value = value.substring(0, value.length - 1);
      value = parseFloat(value) / 100;

      if (hasRoot) {
        value = `√${value}`;
      }
    }

    if (hasRoot) {
      value = `${value}`.length > 1
      ? `${value}`.substring(1)
      : '0';
      if (!hasNonZeroDigit(value) && !isCharacterInString(value, '-')) {
        value = Math.sqrt(parseFloat(value));
      }

    }

    if (hasRoot || hasPercent) {
      setCurrentValue(value);
    }
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
  let hasPercent = hasPercent(value);
  let hasRoot = hasRoot(value);
  if (hasPercent) {
    value = `${value}`.substring(0, value.length - 1);
  }
  if (hasRoot) {
    value = `${value}`.length > 1
      ? `${value}`.substring(1)
      : '';
  }

  if (currentOperator !== null && prevValue === null) {
    value = 0;
    setPrevValue(parseFloat(currentValue).toString());
  }

  if (isCharacterInString(value, '.')) {
    return;
  }

  let newValue = `${value}.`;

  if (hasPercent) {
    newValue = `${newValue}%`;
  }
  if (hasRoot) {
    newValue = `√${newValue}`;
  }

  setCurrentValue(newValue);
}

export const pressZero = (
  currentValue,
  setCurrentValue,
  currentOperator,
  prevValue,
) => {
  let value = currentValue;
  let hasPercent = hasPercent(value);
  let hasRoot = hasRoot(value);
  if (hasPercent) {
    value = `${value}`.substring(0, value.length - 1);
  }
  if (hasRoot) {
    value = `${value}`.length > 1
      ? `${value}`.substring(1)
      : '';
  }

  if ((`${trimMinus(value)}` === '0') ||
      (currentOperator !== null && prevValue === null)) {
    return;
  }

  let newValue = `${value}0`;

  if (hasPercent) {
    newValue = `${newValue}%`;
  }
  if (hasRoot) {
    newValue = `√${newValue}`;
  }

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
  let hasPercent = hasPercent(value);
  let hasRoot = hasRoot(value);
  if (hasPercent) {
    value = `${value}`.substring(0, value.length - 1);
  }
  if (hasRoot) {
    value = `${value}`.length > 1
      ? `${value}`.substring(1)
      : '';
  }

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

  if (hasPercent) {
    newValue = `${newValue}%`;
  }
  if (hasRoot) {
    newValue = `√${newValue}`;
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
  let hasPercent = hasPercent(value);
  let hasRoot = hasRoot(value);
  if (hasPercent) {
    value = `${value}`.substring(0, value.length - 1);
  }
  if (hasRoot) {
    value = `${value}`.length > 1
      ? `${value}`.substring(1)
      : '';
  }

  if (currentOperator !== null && prevValue === null) {
    value = 0;
    setPrevValue(parseFloat(currentValue).toString());
  }

  let newValue = isCharacterInString(value, '-')
    ? value.substring(1)
    : `-${value}`;

    if (hasPercent) {
      newValue = `${newValue}%`;
    }
    if (hasRoot) {
      newValue = `√${newValue}`;
    }

    setCurrentValue(newValue);
}

//#endregion