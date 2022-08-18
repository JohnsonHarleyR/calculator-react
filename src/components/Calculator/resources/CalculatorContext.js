import React, {useState, createContext, useEffect} from 'react';

const CalculatorContext = createContext({});

const CalculatorProvider = ({children}) => {

  const [isOn, setIsOn] = useState(false);
  const [currentValue, setCurrentValue] = useState('0');
  const [currentSign, setCurrentSign] = useState(null);
  const [result, setResult] = useState(null);
  const [prevResult, setPrevResult] = useState(null);

  const clearAll = () => {
    setPrevResult(null);
    setResult(null);
    setCurrentSign(null);
    setCurrentValue(0);
  }


    return (
        <CalculatorContext.Provider value={{
          clearAll,
          isOn, setIsOn,
          currentValue, setCurrentValue,
          currentSign, setCurrentSign,
          result, setResult,
          prevResult, setPrevResult,
        }}>
            {children}
        </CalculatorContext.Provider>
    );

}

export {CalculatorContext};
export default CalculatorProvider;