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
const backspaceButton = document.getElementById('backspace');
const currentDisplay = document.getElementById('current-screen');
const historyDisplay = document.getElementById('history-screen');

//Setting event listeners for all buttons
equalsButton.addEventListener('click', checkOperation);
clearButton.addEventListener('click', clearAll);
decimalButton.addEventListener('click', appendDecimal);
backspaceButton.addEventListener('click', backspaceNumber);
window.addEventListener('keydown', getKeyboardInput);

numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
);

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => getOperation(button.textContent))
);

//Function for handling keyboard input
function getKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) {
    appendNumber(e.key);
  }
  
  if (e.key === '+' || e.key === '-' || e.key === '/' || e.key === '*') {
    getOperation(covertKeyboardOperator(e.key));
  }

  if (e.key === '.') {
    appendDecimal();
  }

  if (e.key === '=' || e.key === 'Enter') {
    checkOperation();
  }  

  if (e.key === 'Backspace') {
    backspaceNumber()
  }

  if (e.key === 'Escape') {
    clearAll();
  }
}

//Function to convert the keyboard input to the calculator input
function convertKeyboardOperator(key) {
  if (key === '/') {
    return '÷';
  } else if (key === '*') {
    return '×';
  } else if (key === '+') {
    return '+';
  } else if (key === '-') {
    return '-';
  }
}

//Function to append number to current display if display is showing 0 or resetFlag is true
function appendNumber(num) {
  if (currentDisplay.textContent === '0' || resetFlag ) {
    resetDisplay();
  }
  currentDisplay.textContent += num;
}

//Function to append decimal if decimal is not already included in currentDisplay
function appendDecimal() {
  if (currentDisplay.textContent === '' || resetFlag) {
    resetDisplay();
  }

  if (currentDisplay.textContent.includes('.')){
    return;
  } else {
    currentDisplay.textContent += `.`;
  }
}

//Function to delete the end of currentDisplay number string
function backspaceNumber() {
  currentDisplay.textContent = currentDisplay.textContent.slice(0,-1);
}

function resetDisplay() {
  currentDisplay.textContent = '';
  resetFlag = false;
}

//Clears screen and all variables for new calculation
function clearAll() {

  //Reset currentDisplay font size
  currentDisplay.style.fontSize = '60px';

  //Re-enabling buttons after DIV 0 ERROR
  if (currentDisplay.textContent === 'DIV 0 ERROR') {
    numberButtons.forEach((button) => button.disabled = false);
    operatorButtons.forEach((button) => button.disabled = false);
    decimalButton.disabled = false;
    equalsButton.disabled = false;
    backspaceButton.disabled = false;
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
  if (currentOperator === '÷' && currentDisplay.textContent.charAt(0) === '0'){
    currentDisplay.style.fontSize = '50px';
    currentDisplay.textContent = 'DIV 0 ERROR';
    
    numberButtons.forEach((button) => button.disabled = true);
    operatorButtons.forEach((button) => button.disabled = true);
    decimalButton.disabled = true;
    equalsButton.disabled = true;
    backspaceButton.disabled = true;

    return;
  }

  //Call roundNumber function on return value of operate(), convert toLocaleString() to add commas
  num2 = currentDisplay.textContent;
  let result = roundNumber(operate(currentOperator, num1, num2)).toLocaleString();

  //Check to see if result is large number to reduce currentDisplay font size
  if (result.length > 8) {
    currentDisplay.style.fontSize = '40px';
  }

  currentDisplay.textContent = result;
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
 
  //Remove commas from string and convert to number
  a = Number(a.replace(/,/g, ''));
  b = Number(b.replace(/,/g, ''));

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