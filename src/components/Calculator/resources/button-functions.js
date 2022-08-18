
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
  if (currentValue === '0') {
    return;
  }
  let newValue = `${currentValue}0`;
  setCurrentValue(newValue);
}

//#endregion