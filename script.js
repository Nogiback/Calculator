let num1 = '';
let num2 = '';
let currentOperator = null;
let resetFlag = false;

const numberButtons = document.querySelectorAll('.num-button');
const operatorButtons = document.querySelectorAll('.op-button');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const display = document.getElementById('current-screen');

equalsButton.addEventListener('click', checkOperation);
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
  };
  display.textContent += num;
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

function getOperation(operator) {
  if (currentOperator !== null) {
    checkOperation();
  }
  num1 = display.textContent;
  currentOperator = operator;
  resetFlag = true;
}

function checkOperation() {
  if (currentOperator === null || resetFlag) {
    return;
  }

  if (currentOperator === '÷' && display.textContent === '0') {
    display.textContent = 'DIV 0 ERROR';
    return;
  }

  num2 = display.textContent;
  display.textContent = roundNumber(operate(currentOperator, num1, num2));
  currentOperator = null;
}

function roundNumber(number) {
  return Math.round(number * 1000) / 1000;
}

function add (a, b) {
  return a + b;
}

function subtract (a, b) {
  return a - b;
}

function multiply (a, b) {
  return a * b;
}

function divide (a, b) {
  return a / b;
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
        return null;
      } else {
        return divide(a,b);
      }
    default:
      return null;  
  }
}