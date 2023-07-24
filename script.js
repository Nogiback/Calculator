//Initializing key variables on page load
let num1 = '';
let num2 = '';
let currentOperator = null;
let resetFlag = false;

//Grabbing all HTML elements from index
const numberButtons = document.querySelectorAll('.num-button');
const operatorButtons = document.querySelectorAll('.op-button');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const decimalButton = document.getElementById('decimal');
const currentDisplay = document.getElementById('current-screen');
const historyDisplay = document.getElementById('history-screen');

//Setting event listeners for all buttons
equalsButton.addEventListener('click', checkOperation);
clearButton.addEventListener('click', clearAll);
decimalButton.addEventListener('click', appendDecimal);

numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
);

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => getOperation(button.textContent))
);

//Function to append number to current display if display is showing 0 or resetFlag is true
function appendNumber(num) {
  if (currentDisplay.textContent === '0' || resetFlag ) {
    resetDisplay();
  }
  currentDisplay.textContent += num;
}

//Function to append decimal if decimal is not already included in currentDisplay
function appendDecimal() {
  if (currentDisplay.textContent.includes('.')){
    return;
  } else {
    currentDisplay.textContent += `.`;
  }
}

function resetDisplay() {
  currentDisplay.textContent = '';
  resetFlag = false;
}

//Clears screen and all variables for new calculation
function clearAll() {

  //Re-enabling buttons after DIV 0 ERROR
  if (currentDisplay.textContent === 'ERROR') {
    numberButtons.forEach((button) => button.disabled = false);
      operatorButtons.forEach((button) => button.disabled = false);
    decimalButton.disabled = false;
    equalsButton.disabled = false;
  }
  
  currentDisplay.textContent = '0';
  historyDisplay.textContent = '';
  num1 = '';
  num2 = '';
  currentOperator = null;
}

//Function checks for operator and sends to operate
function getOperation(operator) {
  if (currentOperator !== null) {
    checkOperation();
  }
  num1 = currentDisplay.textContent;
  currentOperator = operator;
  historyDisplay.textContent = `${num1} ${currentOperator}`;
  resetFlag = true;
}

//Function checks for current operator and calls operate() to complete calculation
function checkOperation() {
  if (currentOperator === null || resetFlag) {
    return;
  }

  //Shows DIV 0 error and disables all buttons except reset button
  if (currentOperator === '÷' && currentDisplay.textContent === '0') {
    currentDisplay.textContent = 'ERROR';
    
    numberButtons.forEach((button) => button.disabled = true);
    operatorButtons.forEach((button) => button.disabled = true);
    decimalButton.disabled = true;
    equalsButton.disabled = true;

    return;
  }

  num2 = currentDisplay.textContent;
  currentDisplay.textContent = roundNumber(operate(currentOperator, num1, num2));
  historyDisplay.textContent = `${num1} ${currentOperator} ${num2} =`;
  currentOperator = null;
}

//Rounds calculated number to 3 decimal places
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

//Function sends operator and numbers to correct corresponding function for result
function operate(operator, a, b) {

  a = parseFloat(a);
  b = parseFloat(b);

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