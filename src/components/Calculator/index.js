import './styling/css/calculator.css';
import { useContext, useEffect, useState } from "react";
import { CalculatorContext } from './resources/CalculatorContext';
import { ButtonType, Defaults } from "./resources/constants";
import Display from './subcomponents/Display';
import Button from './subcomponents/Button';

const Calculator = ({}) => {

  const {
    isOn, setIsOn,
  } = useContext(CalculatorContext);

  const [mainText, setMainText] = useState(Defaults.MAIN_TEXT);
  const [buttons, setButtons] = useState(<></>);


  //#region Effects

  useEffect(() => {
    setButtons(createButtons());
  }, []);

  //#endregion

  //#region Normal Functions

  const createButtons = () => {
    let order = [
      // first row
      {
        type: ButtonType.ON_AC,
        text: 
          <div>
            <span>ON</span>
            <span>/</span>
            <span>AC</span>
          </div>
        },
      {type: ButtonType.SEVEN, text: '7'},
      {type: ButtonType.EIGHT, text: '8'},
      {type: ButtonType.NINE, text: '9'},
      {type: ButtonType.DIVIDE, text: '÷'},

      // second row
      {type: ButtonType.CLEAR, text: 'CE'},
      {type: ButtonType.FOUR, text: '4'},
      {type: ButtonType.FIVE, text: '5'},
      {type: ButtonType.SIX, text: '6'},
      {type: ButtonType.MULTIPLY, text: 'x'},

      // third row
      {type: ButtonType.PERCENT, text: '%'},
      {type: ButtonType.ONE, text: '1'},
      {type: ButtonType.TWO, text: '2'},
      {type: ButtonType.THREE, text: '3'},
      {type: ButtonType.SUBTRACT, text: '-'},

      // fourth row
      {type: ButtonType.SQUARE_ROOT, text: '√'},
      {type: ButtonType.ZERO, text: '0'},
      {type: ButtonType.DOT, text: '.'},
      {
        type: ButtonType.PLUS_MINUS,
        text: '+/-'
      },
      {type: ButtonType.ADD, text: '+'},

      // fifth row
      {type: ButtonType.EQUALS, text: '='},

    ];

    let newButtons = [];
    order.forEach(b => {
      newButtons.push(
        <Button
          key={b.type}
          type={b.type}
        >
          {b.text}
        </Button>
      )
    });
    return newButtons;
  }

  //#endregion

  //#region Event Handlers

  //#endregion

  return (
    <div className="calculator">
      <div className='calc-display'>
        <Display />

        {/* Buttons */}
        {buttons}
      </div>
    </div>
  );

}

export default Calculator;