const inputText = document.getElementById("inputText");
const clearButton = document.getElementById("clearButton");
const equalsButton = document.getElementById("equalsButton");
const buttons = document.querySelectorAll(
    ".calculatorButton:not(#clearButton):not(#equalsButton)");

let firstNumber = "";
let secondNumber = "";
let operator = "";
let justCalculated = false;
let hasError = false;

function appendToInput(value) {
    if ("0123456789".includes(value)) {

        if (hasError) {
            inputText.value = value;
            firstNumber = value;
            hasError = false;
            justCalculated = false;
        } else if (justCalculated) {
            inputText.value = value;
            firstNumber = value;
            justCalculated = false;
        } else if (firstNumber !== "" && operator !== "") {
            inputText.value += value;
            secondNumber += value;
        } else {
            inputText.value += value;
            firstNumber += value;
        }
        return;
    }

    if (["+", "-", "÷", "X"].includes(value)) {

        if (firstNumber !== "" && operator === "") {
            inputText.value += ` ${value} `;
            operator = value;
            justCalculated = false;
        }
    }
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        appendToInput(button.textContent);
    });
});

function clear() {
    inputText.value = "";
    inputText.focus();
    firstNumber = "";
    secondNumber = "";
    operator = "";
    justCalculated = false;
    hasError = false;
}

function calculate() {
    if (firstNumber === "" || operator === "" || secondNumber === "") {
        return;
    }

    const num1 = Number(firstNumber);
    const num2 = Number(secondNumber);
    let result;

    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "÷":
            if (num2 === 0) {
                inputText.value = "Error: Division by zero";
                firstNumber = "";
                secondNumber = "";
                operator = "";
                justCalculated = false;
                hasError = true;
                return;
            }
            result = num1 / num2;
            break;
        case "X":
            result = num1 * num2;
            break;
    }

    inputText.value = result;
    firstNumber = result.toString();
    secondNumber = "";
    operator = "";
    justCalculated = true;
    hasError = false;
}

equalsButton.addEventListener("click", calculate);
clearButton.addEventListener("click", clear);