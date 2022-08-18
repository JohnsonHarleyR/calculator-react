import { ButtonType } from "./constants";

export const getOperatorText = (buttonType) => {
  switch(buttonType) {
    case ButtonType.DIVIDE:
      return '÷';
    case ButtonType.MULTIPLY:
      return 'x';
    case ButtonType.SUBTRACT:
      return '-';
    case ButtonType.ADD:
      return '+';
    case ButtonType.SQUARE_ROOT:
      return '√';
    default:
      return '';
  }
}