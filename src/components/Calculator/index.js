import './styling/css/calculator.css';
import { useEffect, useState } from "react";
import { ButtonType, Defaults } from "./resources/constants";
import Display from './subcomponents/Display';
import Button from './subcomponents/Button';

const Calculator = ({}) => {

  const [isOn, setIsOn] = useState(false);
  const [mainText, setMainText] = useState(Defaults.MAIN_TEXT);
  const [buttons, setButtons] = useState(<></>);

  useEffect(() => {
    setButtons(createButtons());
  }, []);

  const createButtons = () => {
    let order = [
      // first row
      {type: ButtonType.ON_OFF, text: 'AC'},
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
      {type: ButtonType.PLUS_MINUS, text: '+/-'},
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

  return (
    <div className="calculator">
      <div className='calc-display'>
        <Display 
          mainText={mainText}
        />

        {/* Buttons */}
        {buttons}
      </div>
    </div>
  );

}

export default Calculator;