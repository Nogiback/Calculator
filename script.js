let num1 = '';
let num2 = '';
let currentOperator = null;
let resetFlag = false;

const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.num-button');
const operatorButtons = document.querySelectorAll('.op-button');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');

//equalsButton.addEventListener('click', checkOperation);
clearButton.addEventListener('click', clearAll);

numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
);

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => getOperation(button.textContent))
);

function appendNumber(num) {
  if (display.textContent === '0' || resetFlag) {
    resetDisplay();
  }
  display.textContent += num;
  console.log(num);
}

function resetDisplay() {
  display.textContent = '';
  resetFlag = false;
}

function clearAll() {
  display.textContent = '0';
  num1 = '';
  num2 = '';
  currentOperator = null;
}

function add (num1, num2) {
  return num1 + num2;
}

function subtract (num1, num2) {
  return num1 - num2;
}

function multiply (num1, num2) {
  return num1 * num2;
}

function divide (num1, num2) {
  return num1 / num2;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a,b);
    case '×':
      return multiply(a,b);
    case '÷':
      if (b===0) {
        return null
      } else {
        return divide(a,b);
      }
    default:
      return null;  
  }
}

//testing if functions working as intended
//operate('+', 4, 2);