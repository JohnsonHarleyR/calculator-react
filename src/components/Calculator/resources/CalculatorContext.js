import React, {useState, createContext, useEffect} from 'react';

const CalculatorContext = createContext({});

const CalculatorProvider = ({children}) => {

  const [isOn, setIsOn] = useState(false);
  const [prevValue, setPrevValue] = useState(null);
  const [currentValue, setCurrentValue] = useState('0');
  const [currentOperator, setCurrentOperator] = useState(null);
  const [result, setResult] = useState(null);
  const [prevResult, setPrevResult] = useState(null);


  // useEffect(() => {
  //   if (currentOperator !== null && currentOperator !== undefined) {
  //     setPrevValue(currentValue);
  //     setCurrentValue('0');
  //   }
  // }, [currentOperator]);

  const clearAll = () => {
    setPrevResult(null);
    setResult(null);
    setCurrentOperator(null);
    setPrevValue(null);
    setCurrentValue('0');
  }


  return (
    <CalculatorContext.Provider value={{
      clearAll,
      isOn, setIsOn,
      prevValue, setPrevValue,
      currentValue, setCurrentValue,
      currentOperator, setCurrentOperator,
      result, setResult,
      prevResult, setPrevResult,
    }}>
        {children}
    </CalculatorContext.Provider>
  );

}

export {CalculatorContext};
export default CalculatorProvider;