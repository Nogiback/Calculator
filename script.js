let num1 = null;
let num2 = null;
let operator = null;

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

function operate(operator, num1, num2) {
  let answer = null;
  if (operator === '+') {
    answer = add(num1, num2);
  } else if (operator === '-') {
    answer = subtract(num1, num2);
  } else if (operator === '*') {
    answer = multiply(num1, num2);
  } else if (operator === `/`) {
    answer = divide(num1, num2);
  } else {
    alert("Invalid operator");
  }

  alert(answer);

}

//testing if functions working as intended
operate('+', 4, 2);