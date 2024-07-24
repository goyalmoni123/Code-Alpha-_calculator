let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let firstOperand = '';
let secondOperand = '';
let memory = 0;

function clearDisplay() {
    display.innerText = '0';
    currentInput = '';
    operator = '';
    firstOperand = '';
    secondOperand = '';
}

function appendNumber(number) {
    if (currentInput.length >= 10) return; // Limit input length
    if (number === '.' && currentInput.includes('.')) return; // Prevent multiple dots
    currentInput += number;
    display.innerText = currentInput;
}

function appendOperator(op) {
    if (operator) {
        calculateResult();
    }
    firstOperand = currentInput;
    operator = op;
    currentInput = '';
    display.innerText = `${firstOperand} ${operator}`;
}

function calculateResult() {
    if (!operator || !currentInput) return; // No operator or second operand entered
    secondOperand = currentInput;
    let result = 0;
    switch (operator) {
        case '+':
            result = parseFloat(firstOperand) + parseFloat(secondOperand);
            break;
        case '-':
            result = parseFloat(firstOperand) - parseFloat(secondOperand);
            break;
        case '*':
            result = parseFloat(firstOperand) * parseFloat(secondOperand);
            break;
        case '/':
            result = parseFloat(firstOperand) / parseFloat(secondOperand);
            break;
        default:
            return;
    }
    display.innerText = result.toString().slice(0, 10); // Limit display length
    currentInput = result.toString();
    operator = '';
    firstOperand = '';
    secondOperand = '';
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    display.innerText = currentInput || '0';
}

function toggleSign() {
    if (currentInput) {
        currentInput = (parseFloat(currentInput) * -1).toString();
        display.innerText = currentInput;
    }
}

function memoryClear() {
    memory = 0;
}

function memoryRecall() {
    display.innerText = memory.toString();
    currentInput = memory.toString();
}

function memoryAdd() {
    memory += parseFloat(display.innerText);
}

document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9') {
        appendNumber(event.key);
    } else if (event.key === '.') {
        appendNumber(event.key);
    } else if (event.key === '+') {
        appendOperator('+');
    } else if (event.key === '-') {
        appendOperator('-');
    } else if (event.key === '*') {
        appendOperator('*');
    } else if (event.key === '/') {
        appendOperator('/');
    } else if (event.key === 'Enter' || event.key === '=') {
        calculateResult();
    } else if (event.key === 'Backspace') {
        backspace();
    } else if (event.key === 'Escape') {
        clearDisplay();
    }
});
