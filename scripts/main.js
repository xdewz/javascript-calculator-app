import { Calculator } from './Calculator.js';

const calculator = new Calculator();
const display = document.getElementById('display');

let tokens = [];
let currentNumber = '0';
let operatorJustPressed = false;

function updateDisplay() {
  let expr = tokens.map((t) => t.value).join(' ');
  if (!operatorJustPressed && currentNumber !== '0' && tokens.length > 0) {
    expr += ' ' + currentNumber;
  } else if (!operatorJustPressed && tokens.length === 0) {
    expr = currentNumber;
  } else if (operatorJustPressed) {
  }
  display.textContent = expr || '0';
}

function pushCurrentNumber() {
  if (tokens.length === 0 || !operatorJustPressed) {
    tokens.push({ type: 'number', value: currentNumber });
  }
}

function clearAll() {
  tokens = [];
  currentNumber = '0';
  operatorJustPressed = false;
  updateDisplay();
}

function inputDigit(digit) {
  if (operatorJustPressed) {
    currentNumber = digit;
    operatorJustPressed = false;
  } else {
    if (currentNumber === '0' && digit !== '0') {
      currentNumber = digit;
    } else if (currentNumber === '0' && digit === '0') {
      return;
    } else {
      currentNumber += digit;
    }
  }
  updateDisplay();
}

function inputDot() {
  if (operatorJustPressed) {
    currentNumber = '0.';
    operatorJustPressed = false;
  } else if (!currentNumber.includes('.')) {
    currentNumber += '.';
  }
  updateDisplay();
}

function handleOperator(op) {
  const opSymbol = { add: '+', subtract: '-', multiply: '*', divide: '/' }[op];

  if (tokens.length === 0 && currentNumber === '0' && !operatorJustPressed) {
    tokens.push({ type: 'number', value: '0' });
  } else if (!operatorJustPressed) {
    tokens.push({ type: 'number', value: currentNumber });
  }

  if (tokens.length > 0 && tokens[tokens.length - 1].type === 'operator') {
    tokens[tokens.length - 1].value = opSymbol;
  } else {
    tokens.push({ type: 'operator', value: opSymbol });
  }

  currentNumber = '0';
  operatorJustPressed = true;
  updateDisplay();
}

function computeTokens() {
  if (tokens.length === 0) return parseFloat(currentNumber);
  if (tokens[0].type !== 'number') return 0;

  calculator.reset(parseFloat(tokens[0].value));
  for (let i = 1; i < tokens.length; i += 2) {
    const opToken = tokens[i];
    const numToken = tokens[i + 1];
    if (!numToken) break;
    const num = parseFloat(numToken.value);
    try {
      switch (opToken.value) {
        case '+':
          calculator.add(num);
          break;
        case '-':
          calculator.subtract(num);
          break;
        case '*':
          calculator.multiply(num);
          break;
        case '/':
          calculator.divide(num);
          break;
      }
    } catch (e) {
      alert(e.message);
      clearAll();
      return null;
    }
  }
  return calculator.getResult();
}

function handleEquals() {
  if (!operatorJustPressed) {
    tokens.push({ type: 'number', value: currentNumber });
  } else {
    if (tokens.length > 0 && tokens[tokens.length - 1].type === 'operator') {
      tokens.push({ type: 'number', value: '0' });
    }
  }

  const result = computeTokens();
  if (result === null) return;

  tokens = [];
  currentNumber = result.toString();
  operatorJustPressed = false;
  updateDisplay();
}

function handlePercentage() {
  if (currentNumber !== '0') {
    calculator.reset(parseFloat(currentNumber));
    calculator.percentage();
    currentNumber = calculator.getResult().toString();
    updateDisplay();
  }
}

function handleNegate() {
  if (currentNumber !== '0') {
    calculator.reset(parseFloat(currentNumber));
    calculator.negate();
    currentNumber = calculator.getResult().toString();
    updateDisplay();
  }
}

function handleBackspace() {
  if (operatorJustPressed) {
    if (tokens.length > 0 && tokens[tokens.length - 1].type === 'operator') {
      tokens.pop();
      if (tokens.length > 0 && tokens[tokens.length - 1].type === 'number') {
        currentNumber = tokens.pop().value;
      } else {
        currentNumber = '0';
      }
      operatorJustPressed = false;
    }
  } else {
    if (currentNumber.length > 1) {
      currentNumber = currentNumber.slice(0, -1);
    } else {
      currentNumber = '0';
    }
  }
  updateDisplay();
}

document.getElementById('clear').addEventListener('click', clearAll);
document.getElementById('backspace').addEventListener('click', handleBackspace);
document.getElementById('plus-minus').addEventListener('click', handleNegate);
document
  .getElementById('divide')
  .addEventListener('click', () => handleOperator('divide'));
document
  .getElementById('multiply')
  .addEventListener('click', () => handleOperator('multiply'));
document
  .getElementById('minus')
  .addEventListener('click', () => handleOperator('subtract'));
document
  .getElementById('plus')
  .addEventListener('click', () => handleOperator('add'));
document
  .getElementById('percentage')
  .addEventListener('click', handlePercentage);
document.getElementById('get-result').addEventListener('click', handleEquals);
document.getElementById('dot').addEventListener('click', inputDot);

for (let i = 0; i <= 9; i++) {
  document
    .getElementById(`num-${i}`)
    .addEventListener('click', () => inputDigit(i.toString()));
}

document.addEventListener('keydown', (e) => {
  const key = e.key;
  if (key >= '0' && key <= '9') {
    e.preventDefault();
    inputDigit(key);
  } else if (key === '.') {
    e.preventDefault();
    inputDot();
  } else if (key === '+') {
    e.preventDefault();
    handleOperator('add');
  } else if (key === '-') {
    e.preventDefault();
    handleOperator('subtract');
  } else if (key === '*') {
    e.preventDefault();
    handleOperator('multiply');
  } else if (key === '/') {
    e.preventDefault();
    handleOperator('divide');
  } else if (key === 'Enter' || key === '=') {
    e.preventDefault();
    handleEquals();
  } else if (key === 'Backspace') {
    e.preventDefault();
    handleBackspace();
  } else if (key === 'Delete' || key === 'Escape') {
    e.preventDefault();
    clearAll();
  } else if (key === '%') {
    e.preventDefault();
    handlePercentage();
  } else if (key === 'n' || key === 'N') {
    e.preventDefault();
    handleNegate();
  }
});

updateDisplay();
