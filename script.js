let current = "";     // number being typed
let previous = "";    // first number
let operator = "";    // + - * /

const screen = document.getElementById("screen");
const history = document.getElementById("history");

// ---- Calculator operation functions ----
function add(a, b)      { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) return "Error";
  return a / b;
}

// ---- Display ----
function updateScreen() {
  screen.textContent = current || previous || "0";
  const symbol = { "+": "+", "-": "-", "*": "×", "/": "÷" }[operator] || "";
  history.textContent = previous && operator ? previous + " " + symbol : "";
}

// ---- Button actions ----
function appendNumber(num) {
  if (num === "." && current.includes(".")) return;
  if (operator === "" && current === "") previous = "";   // start fresh after a result
  current += num;
  updateScreen();
}

function chooseOperator(op) {
  if (current === "" && previous === "") return;
  if (current !== "" && previous !== "") calculate();
  if (current !== "") {
    previous = current;
    current = "";
  }
  operator = op;
  updateScreen();
}

function calculate() {
  if (previous === "" || current === "" || operator === "") return;
  const a = parseFloat(previous);
  const b = parseFloat(current);
  let result;

  switch (operator) {
    case "+": result = add(a, b); break;
    case "-": result = subtract(a, b); break;
    case "*": result = multiply(a, b); break;
    case "/": result = divide(a, b); break;
  }

  if (result === "Error") {
    clearAll();
    screen.textContent = "Cannot divide by 0";
    return;
  }

  previous = String(parseFloat(result.toFixed(8)));   // show result
  current = "";
  operator = "";
  updateScreen();
}

function clearAll() {
  current = "";
  previous = "";
  operator = "";
  updateScreen();
}

function backspace() {
  current = current.slice(0, -1);
  updateScreen();
}

// ---- Keyboard support (extra credit) ----
document.addEventListener("keydown", function (e) {
  if (e.key >= "0" && e.key <= "9" || e.key === ".") appendNumber(e.key);
  else if (["+", "-", "*", "/"].includes(e.key)) chooseOperator(e.key);
  else if (e.key === "Enter" || e.key === "=") { e.preventDefault(); calculate(); }
  else if (e.key === "Backspace") backspace();
  else if (e.key === "Escape" || e.key.toLowerCase() === "c") clearAll();
});
