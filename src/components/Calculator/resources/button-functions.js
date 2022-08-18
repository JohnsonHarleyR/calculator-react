
//#region Helpers

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

// const doesEndInZero = (str) => {
//   if (str.substring(str.length - 1) === '0') {

//   }
// }

//#endregion

//#region

export const pressOnAc = (setIsOn, clearAll) => {
  setIsOn(true);
  clearAll();
}

export const pressDot = (currentValue, setCurrentValue) => {
  if (isCharacterInString(currentValue, '.')) {
    return;
  }
  let newValue = `${currentValue}.`;
  setCurrentValue(newValue);
}

export const pressZero = (currentValue, setCurrentValue) => {
  if (`${trimMinus(currentValue)}` === '0') {
    return;
  }
  let newValue = `${currentValue}0`;
  setCurrentValue(newValue);
}

export const pressNumber = (number, currentValue, setCurrentValue) => {
  let newValue = `${trimMinus(currentValue)}` !== '0'
    ? `${currentValue}${number}`
    : `${number}`;
  if (isCharacterInString(`${currentValue}`, '-') &&
      !isCharacterInString(`${newValue}`, '-')) {
    newValue = `-${newValue}`;
  }
  setCurrentValue(newValue);
}

export const pressPlusMinus = (currentValue, setCurrentValue) => {
  
  let newValue = isCharacterInString(currentValue, '-')
    ? currentValue.substring(1)
    : `-${currentValue}`;

    setCurrentValue(newValue);
}

//#endregion